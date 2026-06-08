import fs from "fs";
import path from "path";
import { z } from "zod";

const CACHE_PATH = path.resolve("./src/data/games.json");
const ITCH_IO_API_KEY = process.env.ITCH_IO_API_KEY;

const GameSchema = z.object({
  id: z.number(),
  title: z.string(),
  short_text: z.string().optional(),
  url: z.string(),
  cover_url: z.string().optional(),
  published: z.boolean().optional(),
  published_at: z.string().nullable().optional(),
  type: z.string().optional(),
  p_android: z.boolean().optional(),
  p_osx: z.boolean().optional(),
  p_linux: z.boolean().optional(),
  p_windows: z.boolean().optional(),
  downloads_count: z.number().optional(),
});

const GamesSchema = z.object({
  games: z.array(GameSchema),
});

export type Game = z.infer<typeof GameSchema>;
export type Games = z.infer<typeof GamesSchema>;

export function getGamePublishedDate(game: Game): Date | null {
  if (!game.published_at) {
    return null;
  }

  const publishedAt = game.published_at.replace(" ", "T");
  const date = new Date(`${publishedAt}Z`);

  return Number.isNaN(date.getTime()) ? null : date;
}

function readCachedGames(): Games | null {
  if (!fs.existsSync(CACHE_PATH)) {
    return null;
  }

  const cached = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  return GamesSchema.parse(cached);
}

function writeCachedGames(games: Games): void {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(games, null, 2));
}

async function fetchGamesFromApi(): Promise<Games> {
  if (!ITCH_IO_API_KEY) {
    throw new Error("ITCH_IO_API_KEY is not configured.");
  }

  const res = await fetch(`https://itch.io/api/1/${ITCH_IO_API_KEY}/my-games`);

  if (!res.ok) {
    throw new Error(`itch.io request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const parsed = GamesSchema.parse(json);

  return {
    ...parsed,
    games: parsed.games.filter((game) => !game.title.includes("[Restricted]")),
  };
}

export async function getAllGames(): Promise<Games | null> {
  const cached = readCachedGames();

  if (cached) {
    return cached;
  }

  if (!ITCH_IO_API_KEY) {
    if (cached) {
      return cached;
    }

    console.warn("ITCH_IO_API_KEY is not configured and no cache is available.");
    return null;
  }

  try {
    const freshGames = await fetchGamesFromApi();
    writeCachedGames(freshGames);

    console.log(`Games cached to ${CACHE_PATH}`);
    return freshGames;
  } catch (err) {
    console.error("Failed to fetch games. Using fallback cache if available.");

    if (cached) {
      return cached;
    }

    throw err;
  }
}

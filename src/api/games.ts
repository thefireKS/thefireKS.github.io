import fs from "fs";
import path from "path";
import { z } from "zod";

const CACHE_PATH = path.resolve("./src/data/games.json");

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

const API_URL =
  "https://itch.io/api/1/gtXiIwTmGTEvKXjBssNBHeIAsWJnVYN0xzHiFNfw/my-games";

export async function getAllGames(): Promise<Games | null> {
    try {
    if (fs.existsSync(CACHE_PATH)) {
      const cached = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
      return cached;
    }

    const res = await fetch(API_URL);
    const json = await res.json();

    const parsed = GamesSchema.parse(json);
    parsed.games = parsed.games.filter(
      (g) => !g.title.includes("[Restricted]")
    );

    fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
    fs.writeFileSync(CACHE_PATH, JSON.stringify(parsed, null, 2));

    console.log(`✅ Games cached to ${CACHE_PATH}`);
    return parsed;
  } catch (err) {
    console.error("⚠️ Failed to fetch games. Using fallback cache if available.");
    if (fs.existsSync(CACHE_PATH)) {
      const cached = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
      return cached;
    }
    throw err;
  }
}

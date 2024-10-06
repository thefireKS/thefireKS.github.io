import { z } from "zod";

const GameSchema = z.object({
  id: z.number(),
  title: z.string(),
  short_text: z.string().optional(),
  url: z.string(),
  cover_url: z.string(),
  published: z.boolean(),
  published_at: z.coerce.date(),
  type: z.string(),
  p_android: z.boolean(),
  p_osx: z.boolean(),
  p_linux: z.boolean(),
  p_windows: z.boolean(),
  downloads_count: z.number(),
});

const GamesSchema = z.object({
  games: z.array(GameSchema),
});

export type Game = z.infer<typeof GameSchema>;
export type Games = z.infer<typeof GamesSchema>;

const API_URL =
  "https://itch.io/api/1/gtXiIwTmGTEvKXjBssNBHeIAsWJnVYN0xzHiFNfw/my-games";

export async function getAllGames(): Promise<Games | null> {
  const fetchApi = await fetch(API_URL);
  const result = await fetchApi.json();

  try {
    const parsedData = GamesSchema.parse(result);
    parsedData.games = parsedData.games.filter(
      (g) => !g.title.includes("[Restricted]"),
    );
    return parsedData;
  } catch (e) {
    console.error("Validation failed", e);
    return null;
  }
}

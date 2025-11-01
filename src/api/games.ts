import { z } from "zod";

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
  const fetchApi = await fetch(API_URL);
  const result = await fetchApi.json();
  console.log(result);

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

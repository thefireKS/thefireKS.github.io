import MaidMovingBoxes from "./maid-moving-boxes.astro";
import Stalopxasine from "./stalopxasine.astro";
import Tanks from "./tanks.astro";

/*
 * Projects with a bespoke card renderer. Anything not listed here falls back
 * to ./default.astro, which is still driven by `projectCardProfiles` in
 * src/api/projects.ts.
 *
 * Keys are the stable project keys: "itch:<game-id>" or "local:<slug>".
 */
export const projectCardRenderers = {
  "itch:3891484": MaidMovingBoxes,
  "itch:923128": Stalopxasine,
  "itch:3316137": Tanks,
} as const;

export type ProjectCardRendererKey = keyof typeof projectCardRenderers;

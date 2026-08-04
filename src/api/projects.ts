import type { Game } from "$api/games";
import { getAllGames, getGamePublishedDate } from "$api/games";

export type ProjectSource = "itch" | "local";
export type ProjectPlatform =
  | "android"
  | "browser"
  | "linux"
  | "macos"
  | "windows";

export type ProjectCardVariant = "default" | "feature" | "quiet";

export interface ProjectCardProfile {
  variant?: ProjectCardVariant;
  className?: string;
  accent?: string;
  accentSecondary?: string;
  badge?: string;
  imagePosition?: string;
}

/** A second home for the project, next to its primary `url`. */
export interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

export interface Project {
  key: string;
  source: ProjectSource;
  sourceLabel: string;
  /** Name of whatever `url` points at — the itch.io page unless overridden. */
  primaryLabel: string;
  title: string;
  description?: string;
  url: string;
  coverUrl?: string;
  publishedAt: Date | null;
  platforms: ProjectPlatform[];
  downloads?: number;
  links: ProjectLink[];
  card: ProjectCardProfile;
}

type LocalProject = Omit<
  Project,
  "card" | "links" | "primaryLabel" | "publishedAt" | "source" | "sourceLabel"
> & {
  card?: ProjectCardProfile;
  links?: ProjectLink[];
  primaryLabel?: string;
  publishedAt?: Date | string | null;
  sourceLabel?: string;
};

const localProjects: LocalProject[] = [
  // Add non-itch.io projects here. Use a stable key like "local:project-slug".
];

/**
 * Projects whose front door is not their itch.io page. The itch.io page then
 * becomes the first of the project's other links.
 */
const projectPrimaryOverrides: Record<string, ProjectLink> = {
  "itch:3891484": {
    label: "Steam",
    url: "https://store.steampowered.com/app/3917620/MAID_MOVING_BOXES/",
    icon: "icomoon-free:steam",
  },
};

/**
 * Further stores the itch.io API cannot know about, beyond the primary one.
 * Renderers decide how (or whether) to surface these.
 */
const projectExtraLinks: Record<string, ProjectLink[]> = {};

/**
 * Real release dates, where the itch.io publish date tells a different story.
 * Spacivery Legacy is the original 2022 build and was only put on itch.io in
 * 2024; Spacivery is the version that grew out of it. itch.io reports the two
 * the other way round, so they swap.
 */
const projectDateOverrides: Record<string, string> = {
  "itch:2947153": "2022-10-03 21:40:42",
  "itch:1731718": "2024-09-03 08:57:28",
};

/**
 * Projects held at the top of /games, in this order. Everything else follows in
 * reverse-chronological order.
 */
const pinnedProjectKeys: string[] = ["itch:3891484", "itch:923128"];

const projectCardProfiles: Record<string, ProjectCardProfile> = {
  // Projects with a bespoke renderer in src/components/project-cards/ only
  // need `accent` here, which the /games timeline uses for their marker.
  "itch:3891484": {
    accent: "#f2811b",
    accentSecondary: "#f0e0c2",
  },
  "itch:923128": {
    accent: "#6ee7ff",
    accentSecondary: "#ff5b6e",
  },
  "itch:3316137": {
    accent: "#d9a245",
    accentSecondary: "#4b8f87",
  },

  // Everything below uses the default card. Each still gets its own colors and
  // a backdrop pattern, defined in project-cards/default.astro.
  "itch:3774852": {
    className: "project-card-sailorknot",
    accent: "#f2c14e",
    accentSecondary: "#3fb0ac",
  },
  "itch:2947153": {
    variant: "quiet",
    className: "project-card-spacivery-legacy",
    accent: "#c9d3de",
    accentSecondary: "#8e9bab",
  },
  "itch:2927544": {
    className: "project-card-grandmother",
    accent: "#f0a848",
    accentSecondary: "#8fbf6a",
  },
  "itch:2778740": {
    className: "project-card-ships-world",
    accent: "#5cc8ff",
    accentSecondary: "#e8dcc0",
  },
  "itch:2514293": {
    className: "project-card-corovans",
    accent: "#e8b04b",
    accentSecondary: "#7ab648",
  },
  "itch:2090943": {
    className: "project-card-mexa",
    accent: "#8fd14f",
    accentSecondary: "#7fa8d9",
  },
  "itch:1964799": {
    variant: "quiet",
    className: "project-card-floating-fuzzies",
    accent: "#79d2ff",
    accentSecondary: "#b8f7d4",
    imagePosition: "center",
  },
  "itch:1731718": {
    className: "project-card-spacivery",
    accent: "#b98cff",
    accentSecondary: "#ffd166",
  },
  "itch:1706673": {
    className: "project-card-shoot-em-bounce",
    accent: "#ff6b5c",
    accentSecondary: "#ffc233",
  },
};

function getItchProjectKey(game: Game): string {
  return `itch:${game.id}`;
}

function getItchPlatforms(game: Game): ProjectPlatform[] {
  const platforms: ProjectPlatform[] = [];

  if (game.p_windows) platforms.push("windows");
  if (game.p_linux) platforms.push("linux");
  if (game.p_osx) platforms.push("macos");
  if (game.p_android) platforms.push("android");
  if (game.type === "html") platforms.push("browser");

  return platforms;
}

function normalizeItchGame(game: Game): Project {
  const key = getItchProjectKey(game);
  const primary = projectPrimaryOverrides[key];
  const extraLinks = projectExtraLinks[key] ?? [];
  const dateOverride = projectDateOverrides[key];

  return {
    key,
    source: "itch",
    sourceLabel: "itch.io",
    primaryLabel: primary?.label ?? "itch.io",
    title: game.title,
    description: game.short_text,
    url: primary?.url ?? game.url,
    coverUrl: game.cover_url,
    publishedAt: getGamePublishedDate(
      dateOverride ? { ...game, published_at: dateOverride } : game,
    ),
    platforms: getItchPlatforms(game),
    downloads: game.downloads_count,
    links: primary
      ? [{ label: "itch.io", url: game.url }, ...extraLinks]
      : extraLinks,
    card: projectCardProfiles[key] ?? {},
  };
}

function normalizeLocalProject(project: LocalProject): Project {
  const publishedAt =
    typeof project.publishedAt === "string"
      ? new Date(project.publishedAt)
      : (project.publishedAt ?? null);

  return {
    ...project,
    source: "local",
    sourceLabel: project.sourceLabel ?? "Local",
    primaryLabel: project.primaryLabel ?? project.sourceLabel ?? "Local",
    publishedAt:
      publishedAt && Number.isNaN(publishedAt.getTime()) ? null : publishedAt,
    links: project.links ?? projectExtraLinks[project.key] ?? [],
    card: project.card ?? projectCardProfiles[project.key] ?? {},
  };
}

export function sortProjectsByPublishedDateDesc(
  projects: Project[],
): Project[] {
  return [...projects].sort((left, right) => {
    const leftDate = left.publishedAt?.getTime() ?? 0;
    const rightDate = right.publishedAt?.getTime() ?? 0;

    return rightDate - leftDate;
  });
}

/**
 * Pinned projects first, in the order `pinnedProjectKeys` lists them, then
 * everything else newest first.
 */
export function sortProjectsForTimeline(projects: Project[]): Project[] {
  const pinned = pinnedProjectKeys
    .map((key) => projects.find((project) => project.key === key))
    .filter((project): project is Project => project !== undefined);

  const rest = projects.filter(
    (project) => !pinnedProjectKeys.includes(project.key),
  );

  return [...pinned, ...sortProjectsByPublishedDateDesc(rest)];
}

export function formatProjectDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function getAllProjects(): Promise<Project[]> {
  const games = await getAllGames();
  const itchProjects = games ? games.games.map(normalizeItchGame) : [];
  const normalizedLocalProjects = localProjects.map(normalizeLocalProject);

  return sortProjectsForTimeline([...itchProjects, ...normalizedLocalProjects]);
}

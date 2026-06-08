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

export interface Project {
  key: string;
  source: ProjectSource;
  sourceLabel: string;
  title: string;
  description?: string;
  url: string;
  coverUrl?: string;
  publishedAt: Date | null;
  platforms: ProjectPlatform[];
  card: ProjectCardProfile;
}

type LocalProject = Omit<
  Project,
  "card" | "publishedAt" | "source" | "sourceLabel"
> & {
  card?: ProjectCardProfile;
  publishedAt?: Date | string | null;
  sourceLabel?: string;
};

const localProjects: LocalProject[] = [
  // Add non-itch.io projects here. Use a stable key like "local:project-slug".
];

const projectCardProfiles: Record<string, ProjectCardProfile> = {
  "itch:3891484": {
    variant: "feature",
    className: "project-card-maid-moving-boxes",
    accent: "#ff6f91",
    accentSecondary: "#ffd166",
    badge: "Featured",
    imagePosition: "center",
  },
  "itch:1964799": {
    variant: "quiet",
    className: "project-card-floating-fuzzies",
    accent: "#79d2ff",
    accentSecondary: "#b8f7d4",
    imagePosition: "center",
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

  return {
    key,
    source: "itch",
    sourceLabel: "itch.io",
    title: game.title,
    description: game.short_text,
    url: game.url,
    coverUrl: game.cover_url,
    publishedAt: getGamePublishedDate(game),
    platforms: getItchPlatforms(game),
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
    publishedAt:
      publishedAt && Number.isNaN(publishedAt.getTime()) ? null : publishedAt,
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

  return sortProjectsByPublishedDateDesc([
    ...itchProjects,
    ...normalizedLocalProjects,
  ]);
}

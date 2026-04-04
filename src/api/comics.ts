import { getCollection, type CollectionEntry } from "astro:content";

export type ComicEntry = CollectionEntry<"comics">;
export type ComicChapterEntry = CollectionEntry<"comicChapters">;

export interface ComicWithChapters {
  comic: ComicEntry;
  slug: string;
  chapters: ComicChapterEntry[];
  latestChapter?: ComicChapterEntry;
  firstChapter?: ComicChapterEntry;
}

export function getComicSlug(comic: ComicEntry): string {
  return comic.id.replace(/\/index$/, "");
}

export function getChapterSlug(chapter: ComicChapterEntry): string {
  const parts = chapter.id.split("/");
  return parts[parts.length - 1] ?? chapter.id;
}

export function getComicHref(comic: ComicEntry): string {
  return `/comics/${getComicSlug(comic)}`;
}

export function getChapterHref(chapter: ComicChapterEntry): string {
  return `/comics/${chapter.data.comic}/${getChapterSlug(chapter)}`;
}

export function getComicCoverAlt(comic: ComicEntry): string {
  return comic.data.coverAlt ?? `${comic.data.title} cover`;
}

export function compareChaptersAsc(
  left: ComicChapterEntry,
  right: ComicChapterEntry,
): number {
  if (left.data.chapterNumber !== right.data.chapterNumber) {
    return left.data.chapterNumber - right.data.chapterNumber;
  }

  return left.data.releaseDate.getTime() - right.data.releaseDate.getTime();
}

export function compareChaptersDesc(
  left: ComicChapterEntry,
  right: ComicChapterEntry,
): number {
  return compareChaptersAsc(right, left);
}

export function formatComicDate(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function getChaptersForComic(
  slug: string,
  order: "asc" | "desc" = "desc",
): Promise<ComicChapterEntry[]> {
  const chapters = await getCollection(
    "comicChapters",
    ({ data }) => data.comic === slug,
  );

  return chapters.sort(
    order === "asc" ? compareChaptersAsc : compareChaptersDesc,
  );
}

export async function getComicsIndex(): Promise<ComicWithChapters[]> {
  const [comics, chapters] = await Promise.all([
    getCollection("comics"),
    getCollection("comicChapters"),
  ]);

  return comics
    .map((comic) => {
      const slug = getComicSlug(comic);
      const comicChapters = chapters
        .filter((chapter) => chapter.data.comic === slug)
        .sort(compareChaptersDesc);
      const orderedChapters = [...comicChapters].sort(compareChaptersAsc);

      return {
        comic,
        slug,
        chapters: comicChapters,
        latestChapter: comicChapters[0],
        firstChapter: orderedChapters[0],
      };
    })
    .sort((left, right) => {
      if (left.latestChapter && right.latestChapter) {
        return compareChaptersDesc(left.latestChapter, right.latestChapter);
      }

      if (left.latestChapter) {
        return -1;
      }

      if (right.latestChapter) {
        return 1;
      }

      return left.comic.data.title.localeCompare(right.comic.data.title);
    });
}

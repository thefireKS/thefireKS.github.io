import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const artCollection = defineCollection({
  loader: glob({ base: "./src/content/arts", pattern: "**/*.{yaml,yml}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image(),
      coverAlt: z.string().optional(),
      images: z.array(
        z.object({
          name: z.string(),
          image: image(),
        }),
      ),
    }),
});

const comicCollection = defineCollection({
  loader: glob({ base: "./src/content/comics", pattern: "**/*.{yaml,yml}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image(),
      coverAlt: z.string().optional(),
      status: z.enum(["ongoing", "completed", "hiatus"]).default("ongoing"),
      tags: z.array(z.string()).default([]),
    }),
});

const comicChapterCollection = defineCollection({
  loader: glob({
    base: "./src/content/comicChapters",
    pattern: "**/*.{yaml,yml}",
  }),
  schema: ({ image }) =>
    z.object({
      comic: z.string(),
      title: z.string(),
      chapterNumber: z.number(),
      releaseDate: z.coerce.date(),
      summary: z.string().optional(),
      pages: z.array(
        z.object({
          name: z.string().optional(),
          image: image(),
        }),
      ),
    }),
});

export const collections = {
  arts: artCollection,
  comics: comicCollection,
  comicChapters: comicChapterCollection,
};

import { defineCollection, z } from "astro:content";

const artCollection = defineCollection({
  type: "data",
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

export const collections = {
  arts: artCollection,
};

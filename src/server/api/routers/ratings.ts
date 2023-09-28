import { ZodSchema, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { kv } from "@vercel/kv";
import { uuid } from "uuidv4";

type RawRating = {
  Const: string;
  "Date Rated": string;
  Directors: string;
  Genres: string;
  "IMDb Rating": string;
  "Num Votes": string;
  "Release Date": string;
  "Runtime (mins)": string;
  Title: string;
  "Title Type": string;
  URL: string;
  Year: string;
  "Your Rating": string;
};

const ratingSchema: ZodSchema<RawRating[]> = z.array(
  z.object({
    Const: z.string(),
    "Date Rated": z.string(),
    Directors: z.string(),
    Genres: z.string(),
    "IMDb Rating": z.string(),
    "Num Votes": z.string(),
    "Release Date": z.string(),
    "Runtime (mins)": z.string(),
    Title: z.string(),
    "Title Type": z.string(),
    URL: z.string(),
    Year: z.string(),
    "Your Rating": z.string(),
  }),
);

export const ratingsRouter = createTRPCRouter({
  upload: publicProcedure
    .input(ratingSchema)
    .mutation(async ({ ctx, input }) => {
      const id = uuid();
      await kv.set(id, input, {});
      return id;
    }),
});

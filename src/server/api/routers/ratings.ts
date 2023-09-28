import { ZodSchema, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
  upload: publicProcedure.input(ratingSchema).mutation(({ ctx, input }) => {
    return "";
  }),
});

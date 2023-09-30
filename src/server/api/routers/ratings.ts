import { ZodSchema, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { kv } from "@vercel/kv";
import { uuid } from "uuidv4";
import { parseCSVToJson } from "~/utils/csv-parser";
import { TRPCError } from "@trpc/server";

type JSONRating = {
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

const ratingSchema: ZodSchema<JSONRating[]> = z.array(
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

const getRawRatingsFromKV = async (id: string): Promise<string> => {
  const rawRatings = await kv.get<string>(id);
  if (!rawRatings) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No ratings found for this id",
    });
  }

  return rawRatings;
};

export const ratingsRouter = createTRPCRouter({
  getRaw: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const rawRatings = await getRawRatingsFromKV(input);
    return rawRatings;
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const rawRatings = await getRawRatingsFromKV(input);
    const ratingsJSON = await parseCSVToJson(rawRatings);
    return ratingsJSON;
  }),

  upload: publicProcedure
    .input(z.string().nonempty())
    .mutation(async ({ ctx, input }) => {
      // TODO: validate input as csv
      const id = uuid();
      await kv.set(id, input, {});
      return id;
    }),
});

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { kv } from "@vercel/kv";
import { uuid } from "uuidv4";
import { TRPCError } from "@trpc/server";

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
  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const rawRatings = await getRawRatingsFromKV(input);
    return rawRatings;
  }),

  upload: publicProcedure
    .input(z.string().nonempty())
    .mutation(async ({ ctx, input }) => {
      // TODO: validate input as imdb csv using regex
      const id = uuid();
      // TODO: error handling
      await kv.set(id, input, {});
      return id;
    }),
});

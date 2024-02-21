import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const sendRatingsFile = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ratings", {
      file: args.storageId,
    });
  },
});

export const getRatingsFileURL = query({
  args: { id: v.id("ratings") },
  handler: async (ctx, args) => {
    const ratingDoc = await ctx.db.get(args.id);

    if (!ratingDoc) {
      throw new ConvexError(`Ratings for id: ${args.id} not found`);
    }

    return ctx.storage.getUrl(ratingDoc.file as Id<"_storage">);
  },
});

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ratings: defineTable({
    file: v.string(),
  }),
});

"use server";

import { kv } from "@vercel/kv";
import { uuid } from "uuidv4";

const getRawRatingsFromKV = async (id: string): Promise<string> => {
  const rawRatings = await kv.get<string>(id);
  if (!rawRatings) {
    throw new Error("No ratings found for this id");
  }

  return rawRatings;
};

export async function getRatings(id: string) {
  const rawRatings = await getRawRatingsFromKV(id);
  return rawRatings;
}

export async function uploadRatings(ratings: string) {
  // TODO: validate input as imdb csv using regex
  const id = uuid();
  // TODO: error handling
  await kv.set(id, ratings, {});
  return id;
}

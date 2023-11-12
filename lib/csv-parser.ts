import csv from "csvtojson";

export type RawRating = {
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

export const parseCSVToJson = async (
  csvString: string,
): Promise<RawRating[]> => {
  const parser = csv();
  const jsonArray: RawRating[] = (await parser.fromString(
    csvString,
  )) as RawRating[];
  return jsonArray;
};

import csv from "csvtojson";

type Rating = {
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

const parser = csv();

export const parseCSVToJson = async (csvString: string): Promise<Rating[]> => {
  const jsonArray: Rating[] = (await parser.fromString(csvString)) as Rating[];
  return jsonArray;
};

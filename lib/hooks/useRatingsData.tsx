import { api } from "@/convex/_generated/api";
import { type Id } from "@/convex/_generated/dataModel";
import { parseCSVToJson } from "@/lib/csv-parser";
import { fetchQuery } from "convex/nextjs";
import { useEffect, useState } from "react";

export type MediaContentMap = Map<string, MediaContent>;

export type MediaContent = {
  imdbID: string;
  dateRated: string;
  directors: string[];
  genres: string[];
  avgIMDBRating: number;
  numVotes: number;
  releaseDate: string;

  /** in minutes */
  runtime: number;
  title: string;
  mediaType: "tvMiniSeries" | "tvSeries" | "movie";
  url: string;
  year: number;
  userRating: number;
};

function useRatingsData(url: string) {
  const [ratingsData, setRatingsData] = useState<MediaContentMap | null>(null);

  useEffect(() => {
    async function fetchRatingsData() {
      const fetchRes = await fetch(url);
      const csvData = await fetchRes.text();
      const rawData = await parseCSVToJson(csvData);

      const _ratingsData: MediaContentMap = new Map<string, MediaContent>();
      rawData.forEach((rawRating) => {
        const imdbID = rawRating.Const;
        const dateRated = rawRating["Date Rated"];
        const directors = rawRating.Directors.split(",").map((director) =>
          director.trim(),
        );
        const genres = rawRating.Genres.split(",").map((genre) => genre.trim());
        const avgIMDBRating = Number(rawRating["IMDb Rating"]);
        const numVotes = Number(rawRating["Num Votes"]);
        const releaseDate = rawRating["Release Date"];
        const runtime = Number(rawRating["Runtime (mins)"]);
        const title = rawRating.Title;
        const mediaType = rawRating["Title Type"] as MediaContent["mediaType"];
        const url = rawRating.URL;
        const year = Number(rawRating.Year);
        const userRating = Number(rawRating["Your Rating"]);

        _ratingsData.set(rawRating.Const, {
          imdbID,
          dateRated,
          directors,
          genres,
          avgIMDBRating,
          numVotes,
          releaseDate,
          runtime,
          title,
          mediaType,
          url,
          year,
          userRating,
        });
      });
      setRatingsData(_ratingsData);
    }

    void fetchRatingsData();
  }, [url]);

  return ratingsData;
}

export default useRatingsData;

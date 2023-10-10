import { useState, useEffect } from "react";
import { trpc } from "~/app/_trpc/client";
import { parseCSVToJson } from "~/utils/csv-parser";
import { type MediaContentMap, type MediaContent } from "./useChartData";

function useRatingsData(id: string) {
  // TODO: better error handling
  const getCSVData = trpc.ratings.get.useQuery(id);
  const [ratingsData, setRatingsData] = useState<MediaContentMap | null>(null);

  useEffect(() => {
    console.log(getCSVData.data);
    if (!getCSVData.isSuccess) return;

    parseCSVToJson(getCSVData.data)
      .then((rawData) => {
        const mediaMap: MediaContentMap = new Map<string, MediaContent>();
        rawData.forEach((rawRating) => {
          const imdbID = rawRating.Const;
          const dateRated = rawRating["Date Rated"];
          const directors = rawRating.Directors.split(",").map((director) =>
            director.trim(),
          );
          const genres = rawRating.Genres.split(",").map((genre) =>
            genre.trim(),
          );
          const avgIMDBRating = Number(rawRating["IMDb Rating"]);
          const numVotes = Number(rawRating["Num Votes"]);
          const releaseDate = rawRating["Release Date"];
          const runtime = Number(rawRating["Runtime (mins)"]);
          const title = rawRating.Title;
          const mediaType = rawRating[
            "Title Type"
          ] as MediaContent["mediaType"];
          const url = rawRating.URL;
          const year = Number(rawRating.Year);
          const userRating = Number(rawRating["Your Rating"]);

          mediaMap.set(rawRating.Const, {
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
        setRatingsData(mediaMap);
      })
      .catch((err) => {
        console.error(err);
        console.log(getCSVData.data);
      });
  }, [getCSVData.isSuccess, getCSVData.data]);

  return ratingsData;
}

export default useRatingsData;

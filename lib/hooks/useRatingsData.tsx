import { parseCSVToJson } from "@/lib/csv-parser";
import { type MediaContentMap, type MediaContent } from "./useChartData";
import { getRatings } from "@/app/actions";

async function useRatingsData(id: string) {
  // TODO: better error handling
  const csvData = await getRatings(id);
  const rawData = await parseCSVToJson(csvData);
  const ratingsData: MediaContentMap = new Map<string, MediaContent>();
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

    ratingsData.set(rawRating.Const, {
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

  return ratingsData;
}

export default useRatingsData;

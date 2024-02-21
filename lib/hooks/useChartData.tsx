import { type ChartData as ChartDataProp } from "chart.js";
import { useMemo } from "react";
import { type MediaContent, type MediaContentMap } from "./useRatingsData";

// TODO: string literals of possible genres
export type Genre = string;

export type ChartData = {
  totalMoviesRated: number;
  averageOverallRating: number;
  /** in minutes */
  totalWatchTime: number;
  earliestRatingDate: Date;
  ratingDistribution: ChartDataProp<"line">;
  genreDistribution: ChartDataProp<"doughnut">;
  genreCountByDecade: ChartDataProp<"bar">;
  ratingByDecade: ChartDataProp<"line">;
  moviesByDirector: Map<string, MediaContent[]>;
  moviesByGenre: Map<Genre, MediaContent[]>;
  overratedMovies: ChartDataProp<"bar">;
  underratedMovies: ChartDataProp<"bar">;
  yearAndRating: ChartDataProp<"scatter">;
  unpopularMovies: MediaContent[];
  popularMovies: MediaContent[];
};

function useChartData(ratingData: MediaContentMap | null): ChartData | null {
  // TODO: optimize this hook
  // Extract the movies
  const movieData = useMemo(() => {
    if (!ratingData) return null;
    return Array.from(ratingData.values()).filter(
      (r) => r.mediaType === "movie",
    );
  }, [ratingData]);

  const moviesByGenre = useMemo(() => {
    if (!movieData) return null;
    const _map = new Map<string, MediaContent[]>();
    movieData.forEach((movie) => {
      const genre = movie.genres[0]!; // TODO: handle multiple genres
      if (_map.has(genre)) {
        _map.set(genre, [..._map.get(genre)!, movie]);
      } else {
        _map.set(genre, [movie]);
      }
    });
    return _map;
  }, [movieData]);

  const moviesByDecade = useMemo(() => {
    if (!movieData) return null;
    const _map = new Map<number, MediaContent[]>();
    movieData
      .sort((a, b) => a.year - b.year)
      .forEach((movie) => {
        const decade = Math.floor(movie.year / 10) * 10;
        if (_map.has(decade)) {
          _map.set(decade, [..._map.get(decade)!, movie]);
        } else {
          _map.set(decade, [movie]);
        }
      });
    return _map;
  }, [movieData]);

  const moviesByDirector = useMemo(() => {
    if (!movieData) return null;
    const _map = new Map<string, MediaContent[]>();
    movieData.forEach((movie) => {
      movie.directors.forEach((director) => {
        if (_map.has(director)) {
          _map.set(director, [..._map.get(director)!, movie]);
        } else {
          _map.set(director, [movie]);
        }
      });
    });
    return _map;
  }, [movieData]);

  const moviesByDirectorSorted = useMemo(() => {
    if (!moviesByDirector) return null;
    return new Map(
      Array.from(moviesByDirector.entries()).sort(
        (a, b) => b[1].length - a[1].length,
      ),
    );
  }, [moviesByDirector]);

  const moviesByGenreSorted = useMemo(() => {
    if (!moviesByGenre) return null;
    return new Map(
      Array.from(moviesByGenre.entries()).sort(
        (a, b) => b[1].length - a[1].length,
      ),
    );
  }, [moviesByGenre]);

  const overratedMovies = useMemo(() => {
    if (!movieData) return null;
    return movieData
      .filter((media) => media.avgIMDBRating > media.userRating)
      .sort((a, b) => {
        return (
          Math.abs(b.userRating - b.avgIMDBRating) -
          Math.abs(a.userRating - a.avgIMDBRating)
        );
      })
      .slice(0, 5);
  }, [movieData]);

  const underratedMovies = useMemo(() => {
    if (!movieData) return null;
    return movieData
      .filter((media) => media.avgIMDBRating < media.userRating)
      .sort((a, b) => {
        return (
          Math.abs(b.userRating - b.avgIMDBRating) -
          Math.abs(a.userRating - a.avgIMDBRating)
        );
      })
      .slice(0, 5);
  }, [movieData]);

  if (
    !movieData ||
    !moviesByGenre ||
    !moviesByDirector ||
    !moviesByDecade ||
    !moviesByDirectorSorted ||
    !moviesByGenreSorted ||
    !overratedMovies ||
    !underratedMovies
  )
    return null;

  const chartData: ChartData = {
    totalMoviesRated: movieData.length,
    averageOverallRating:
      Array.from(movieData.values()).reduce(
        (acc, curr) => acc + curr.userRating,
        0,
      ) / movieData.length,
    totalWatchTime: Array.from(movieData.values()).reduce(
      (acc, curr) => acc + curr.runtime,
      0,
    ),
    earliestRatingDate: Array.from(movieData.values()).reduce((acc, curr) => {
      if (new Date(curr.dateRated) < acc) return new Date(curr.dateRated);
      return acc;
    }, new Date()),
    ratingDistribution: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      datasets: [
        {
          label: "Your Rating Distribution",
          data: Array(10)
            .fill(0)
            .map(
              (_, rating) =>
                Array.from(movieData.values()).filter(
                  (r) => Math.floor(r.userRating) === rating + 1,
                ).length,
            ),
        },
        {
          label: "IMDB Rating Distribution",
          data: Array(10)
            .fill(0)
            .map(
              (_, rating) =>
                Array.from(movieData.values()).filter(
                  (r) => Math.floor(r.avgIMDBRating) === rating + 1,
                ).length,
            ),
        },
      ],
    },
    genreDistribution: {
      labels: Array.from(moviesByGenre.keys()),
      datasets: [
        {
          data: Array.from(moviesByGenre.values()).map(
            (movies) => movies.length,
          ),
        },
      ],
    },
    genreCountByDecade: {
      labels: Array.from(moviesByDecade.keys()),
      datasets: Array.from(moviesByGenre.keys()).map((genre) => {
        return {
          label: genre,
          data: Array.from(moviesByDecade.values()).map(
            (movies) => movies.filter((m) => m.genres[0] === genre).length, // TODO: handle multiple genres
          ),
        };
      }),
    },
    ratingByDecade: {
      labels: Array.from(moviesByDecade.keys()),
      datasets: [
        {
          label: "Your Average Rating",
          data: Array.from(moviesByDecade.values()).map((movies) => {
            return (
              movies.reduce((acc, curr) => acc + curr.userRating, 0) /
              movies.length
            );
          }),
        },
        {
          label: "IMDB Average Rating",
          data: Array.from(moviesByDecade.values()).map((movies) => {
            return (
              movies.reduce((acc, curr) => acc + curr.avgIMDBRating, 0) /
              movies.length
            );
          }),
        },
      ],
    },
    moviesByDirector: moviesByDirectorSorted,
    moviesByGenre: moviesByGenreSorted,
    overratedMovies: {
      labels: overratedMovies.map((m) => m.title),
      datasets: [
        {
          label: "IMDB Average Rating",
          data: overratedMovies.map((m) => m.avgIMDBRating),
        },
        {
          label: "Your Rating",
          data: overratedMovies.map((m) => m.userRating),
        },
      ],
    },
    underratedMovies: {
      labels: underratedMovies.map((m) => m.title),
      datasets: [
        {
          label: "IMDB Average Rating",
          data: underratedMovies.map((m) => m.avgIMDBRating),
        },
        {
          label: "Your Rating",
          data: underratedMovies.map((m) => m.userRating),
        },
      ],
    },
    yearAndRating: {
      datasets: Array.from(movieData).map((m) => {
        return {
          label: m.title,
          data: [
            {
              y: m.userRating,
              x: m.year,
            },
          ],
        };
      }),
    },
    popularMovies: [...movieData]
      .sort((a, b) => {
        return b.numVotes - a.numVotes;
      })
      .slice(0, 5),
    unpopularMovies: [...movieData]
      .sort((a, b) => {
        return a.numVotes - b.numVotes;
      })
      .slice(0, 5),
  };

  return chartData;
}

export default useChartData;

/*

  ✅ most watched genres
  ✅ top rated films in each genre
  ✅ average rating of each genre

  rating distribution
  ✅ hot takes: based on average rating, which films are overrated and which are underrated
  ❌ most watched actors and actresses
  ❌ most favored actors and actresses
  ✅ most watched directors
  ✅ most favored directors
  ❌ writers
  runtime?

  ❌ box office bomb but rated highly

  ❌ production company?

  ✅ favored year/decade of release
  ✅ most watched year/decade of release

  ❌ tv show season count analysis

  dashboard:

  ✅- Average ratings per decade
  ✅- lists: top 5 watched genres, top 5 rated movies by selectable genre, top 3 watched directors
  - some sort of scatter chart with every movie as a dot
  ✅- overrated and underrated movies
  ✅- something the shows a relationship between genre and rating
  - movies no one has rated, most rated, least rated
  */

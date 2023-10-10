"use client";

import Chart from "chart.js/auto";
import { CategoryScale, Colors } from "chart.js";
import { useMemo } from "react";
import LineGraph from "./charts/LineGraph";
import { cn } from "~/lib/utils";
import DoughnutChart from "./charts/DoughnutChart";
import ScatterChart from "./charts/ScatterChart";
import BarChart from "./charts/BarChart";
import useRatingsData from "~/hooks/useRatingsData";
import useChartData, { type MediaContent } from "~/hooks/useChartData";
import CardContainer from "./CardContainer";
import FilteredList from "./FilteredList";

Chart.register(CategoryScale);
Chart.register(Colors);

interface Props extends React.ComponentPropsWithoutRef<"section"> {
  id: string;
}

const DataDashboard = ({ id, ...props }: Props) => {
  const ratingsData = useRatingsData(id); // TODO: turn into a context provider?
  const chartData = useChartData(ratingsData);

  const filteredGenres: Map<string, MediaContent[]> = useMemo(() => {
    if (!chartData) return new Map<string, MediaContent[]>();
    const filteredGenres = new Map<string, MediaContent[]>();
    chartData.moviesByGenre.forEach((movies, genre) => {
      filteredGenres.set(
        genre,
        movies.sort((a, b) => b.userRating - a.userRating).slice(0, 7),
      );
    });
    return filteredGenres;
  }, [chartData]);

  if (!ratingsData || !chartData) return <>LOADING</>; // TODO: better loading state

  return (
    <section
      className={cn(props.className, "grid grid-cols-4 gap-2 lg:grid-cols-6")}
      {...props}
    >
      {/* SINGLE VALUES */}
      <CardContainer
        subTitle="Movies Rated"
        className="col-span-2 flex flex-col justify-between lg:col-span-1"
      >
        {chartData.totalMoviesRated.toString()}
      </CardContainer>
      <CardContainer
        subTitle="Average Rating"
        className="col-span-2 flex flex-col justify-between lg:col-span-1"
      >
        {chartData.averageOverallRating.toFixed(2).toString()}
      </CardContainer>
      <CardContainer
        subTitle="Total Watch Time"
        className="col-span-2 flex flex-col justify-between lg:col-span-1"
      >
        {`${Math.floor(chartData.totalWatchTime / 60)
          .toString()
          .padStart(2, "0")} hours, ${(chartData.totalWatchTime % 60)
          .toString()
          .padStart(2, "0")} minutes`}
      </CardContainer>
      <CardContainer
        subTitle="Been Rating Since"
        className="col-span-2 flex flex-col justify-between lg:col-span-1"
      >
        {chartData.earliestRatingDate.toDateString()}
      </CardContainer>
      {/* CHARTS */}
      <CardContainer title="Rating Distribution" className="col-span-4">
        <LineGraph chartData={chartData.ratingDistribution} />
      </CardContainer>
      <CardContainer
        title="Genre Count"
        subTitle="Genres you frequently rate"
        className="col-span-4"
      >
        <ol className="z-10 -mb-8">
          {Array.from(chartData.moviesByGenre)
            .slice(0, 3)
            .map(([genre, movies]) => (
              <li key={genre} className="flex justify-between">
                <span>{genre}</span>
                <span>{movies.length}</span>
              </li>
            ))}
        </ol>
        <DoughnutChart chartData={chartData.genreDistribution} />
      </CardContainer>
      <CardContainer title="Genre Count by Year" className="col-span-4">
        <BarChart stacked={true} chartData={chartData.genreCountByDecade} />
      </CardContainer>
      <CardContainer title="Rating by Year" className="col-span-4">
        <LineGraph chartData={chartData.ratingByDecade} />
      </CardContainer>
      <CardContainer
        title="Overrated"
        subTitle="Movies you think are overrated"
        className="col-span-4"
      >
        <BarChart chartData={chartData.overratedMovies} />
      </CardContainer>
      <CardContainer
        title="Underrated"
        subTitle="Movies you think are underrated"
        className="col-span-4"
      >
        <BarChart chartData={chartData.underratedMovies} />
      </CardContainer>
      <CardContainer title="Ratings over the years" className="col-span-4">
        <ScatterChart chartData={chartData.yearAndRating} />
      </CardContainer>
      {/* LISTS */}
      <CardContainer title="Common Directors" className="col-span-2">
        <ol>
          {Array.from(chartData.moviesByDirector.entries())
            .splice(0, 5)
            .map(([director, movies]) => (
              <li key={director} className="flex justify-between">
                <span>{director}</span>
                <span>{movies.length}</span>
              </li>
            ))}
        </ol>
      </CardContainer>
      <CardContainer title="Favorite Genres" className="col-span-2">
        <ol>
          {/* TODO: yikes */}
          {Array.from(chartData.moviesByGenre)
            .map(([genre, movies]) => {
              const avg =
                movies.reduce((acc, curr) => {
                  acc += curr.userRating;
                  return acc;
                }, 0) / movies.length;
              return [genre, avg];
            })
            .sort((a, b) => Number(b[1]) - Number(a[1]))
            .splice(0, 5)
            .map(([genre, avgRating]) => (
              <li key={genre} className="flex justify-between">
                <span>{genre}</span>
                <span>{Number(avgRating).toFixed(2)}</span>
              </li>
            ))}
        </ol>
      </CardContainer>
      <CardContainer
        title="Unpopular movies you've rated"
        subTitle="Based on the total number of votes on IMDB"
        className="col-span-4"
      >
        <ol>
          {chartData.unpopularMovies.map((movie) => (
            <li key={movie.imdbID} className="flex justify-between">
              <span>{movie.title}</span>
              <span>{`${movie.numVotes.toLocaleString()} votes`}</span>
            </li>
          ))}
        </ol>
      </CardContainer>
      <CardContainer
        title="Popular movies you've rated"
        subTitle="Based on the total number of votes on IMDB"
        className="col-span-4"
      >
        <ol>
          {chartData.popularMovies.map((movie) => (
            <li key={movie.imdbID} className="flex justify-between">
              <span>{movie.title}</span>
              <span>{`${movie.numVotes.toLocaleString()} votes`}</span>
            </li>
          ))}
        </ol>
      </CardContainer>
      <CardContainer title="Genre Ratings" className="col-span-4">
        <FilteredList listItems={filteredGenres} />
      </CardContainer>
    </section>
  );
};

export default DataDashboard;

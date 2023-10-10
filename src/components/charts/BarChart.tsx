import { type ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import { cn } from "~/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  chartData: ChartData<"bar">;
  stacked?: boolean;
}

const BarChart = ({ chartData, className, stacked }: Props) => {
  return (
    <Bar
      className={cn("h-full", className)}
      data={chartData}
      options={{
        responsive: true,
        scales: {
          x: {
            stacked: stacked,
          },
          y: {
            stacked: stacked,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "",
          },
          colors: {
            forceOverride: true,
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default BarChart;

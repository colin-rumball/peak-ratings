import { type ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import { cn } from "~/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  chartData: ChartData<"line">;
}

const LineGraph = ({ className, chartData }: Props) => {
  return (
    <Line
      className={cn("h-full", className)}
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: true,
          },
        },
      }}
    />
  );
};

export default LineGraph;

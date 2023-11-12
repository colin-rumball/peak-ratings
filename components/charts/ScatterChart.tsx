import { type ChartData } from "chart.js";
import { Scatter } from "react-chartjs-2";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  chartData: ChartData<"scatter">;
}

const ScatterChart = ({ chartData, className }: Props) => {
  return (
    <Scatter
      className={cn("h-full", className)}
      data={chartData}
      options={{
        scales: {
          x: {
            ticks: {
              callback: (value) => {
                return value.toString().replaceAll(",", "");
              },
            },
            max: new Date().getFullYear() + 1,
          },
          y: {
            suggestedMin: 1,
            suggestedMax: 10,
          },
        },
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label ?? "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y;
                }
                return label;
              },
            },
          },
          title: {
            display: true,
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

export default ScatterChart;

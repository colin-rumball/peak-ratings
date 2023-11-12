import { type ChartData } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  chartData: ChartData<"doughnut">;
}

const DoughnutChart = ({ chartData, className }: Props) => {
  return (
    <Doughnut
      className="h-full"
      data={chartData}
      options={{
        circumference: 180,
        rotation: 270,
        responsive: true,
        plugins: {
          title: {
            display: true,
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
      }}
    />
  );
};

export default DoughnutChart;

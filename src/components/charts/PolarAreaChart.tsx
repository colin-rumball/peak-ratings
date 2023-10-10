import { type ChartData } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { cn } from "~/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
  chartData: ChartData<"polarArea">;
}

const PolarAreaChart = ({ title, chartData, className }: Props) => {
  return (
    <Card className={cn(className, "h-full")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent className="h-full">
        <PolarArea
          className="h-full"
          data={chartData}
          options={{
            elements: {
              arc: {
                circular: true,
              },
            },
            responsive: true,
            scales: {
              r: {
                pointLabels: {
                  display: true,
                  centerPointLabels: true,
                  font: {
                    size: 18,
                  },
                },
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
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default PolarAreaChart;

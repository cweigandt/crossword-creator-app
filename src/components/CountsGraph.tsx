import Chart from "react-google-charts";
import { ElementType } from "../data/types/PuzzleTypes";
import "../styles/CountsGraph.css";

type PropsType = {
  elements: ElementType[];
};

const CountsGraph = ({ elements }: PropsType) => {
  const data = new Array(15).fill([]).map((_, i) => [i + 1, 0]);
  elements.forEach((el) => {
    const existingValue = data[el.length - 1][1];
    data[el.length - 1][1] = existingValue + 1;
  });

  return (
    <div>
      <Chart
        loader={<div style={{ height: 200 }}></div>}
        width={500}
        height={200}
        chartType="ColumnChart"
        data={[["Length", "Count"], ...data]}
        options={{
          animation: {
            duration: 300,
            easing: "out",
            startup: true,
          },
          backgroundColor: "transparent",
          chart: {
            title: "Clue Length Counts",
          },
          legend: { position: "none" },
          hAxis: {
            ticks: new Array(15).fill([]).map((_, i) => i + 1),
            viewWindow: {
              max: 16,
              min: 0,
            },
          },
          vAxis: {
            ticks: new Array(20).fill(0).map((_, i) => i * 2),
            viewWindow: {
              max: Math.max(10, ...data.map((el) => el[1])),
              min: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default CountsGraph;

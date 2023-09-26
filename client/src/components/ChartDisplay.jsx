import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartDisplay({ props }) {
  // sample props
  /*
    const data = [
        {
            response, count
        }
    ]
    */
  const count = props.map((v) => v.count);
  const response = props.map((v) => v.response);
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Responses Bar Chart",
      },
    },
  };

  const labels = response;

  const data = {
    labels,
    datasets: [
      {
        label: "Responses",
        data: count,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
   
  };
  return <Bar options={options} data={data}  />;
}

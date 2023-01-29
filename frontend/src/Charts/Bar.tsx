import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.font.family = "Poppins";
ChartJS.defaults.font.size = 10;
ChartJS.defaults.font.lineHeight = 2;
ChartJS.defaults.font.weight = "900";
ChartJS.defaults.color = "#000";
const BarComponent: React.FC<{}> = () => {
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weekly expenses",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ["#000"],
        borderRadius: 0.1,
      },
    ],
  };
  let option: ChartOptions<"bar"> = {
    borderColor: "#b4cbd0",
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
  };
  return (
    <div className="shadow  w-full p-4 rounded-xx bg-white">
      <Bar data={data} options={option} />
    </div>
  );
};

export default BarComponent;

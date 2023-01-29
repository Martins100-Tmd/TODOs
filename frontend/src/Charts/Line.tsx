import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ChartOptions,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { useContext, useMemo } from "react";
import User from "../context/context";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
const LineComponent: React.FC<{}> = () => {
  let { state } = useContext(User);
  let State = useMemo(() => {
    return state;
  }, [state]);
  let todos = {
    a: State.Todos.lifestyle_todos.length - 1,
    b: State.Todos.business_todos.length - 1,
    c: State.Todos.personal_todos.length - 1,
  };
  const labels = ["Business", "Personal", "Liefestyle"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weekly expenses",
        data: [todos.b, todos.c, todos.a],
        backgroundColor: ["#00FF00"],
        borderRadius: 0.1,
        borderWidth: 1,
      },
    ],
  };
  let option: ChartOptions<"line"> = {
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
    <div className="shadow w-full p-5 rounded-xl bg-white">
      <Line data={data} options={option} />
    </div>
  );
};

export default LineComponent;

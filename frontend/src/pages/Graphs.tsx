import { FaChartPie } from "react-icons/fa";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux/hooks";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { getIncome } from "../shared/utils/getIncome";
import { getExpenses } from "../shared/utils/getExpenses";
import {
  getHouseExpenses,
  getCarExpenses,
  getUtilityExpenses,
  getMedicalExpenses,
  getGroceryExpenses,
  getPetExpenses,
  getDiscretionaryExpenses,
} from "../shared/utils/getCategoryExpenses";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const Graphs = () => {
  const { transactions } = useAppSelector((state) => state.transactionReducer);
  //Get all chart values
  const income = getIncome(transactions);
  const expenses = getExpenses(transactions);
  const house = getHouseExpenses(transactions);
  const car = getCarExpenses(transactions);
  const utility = getUtilityExpenses(transactions);
  const medical = getMedicalExpenses(transactions);
  const grocery = getGroceryExpenses(transactions);
  const pets = getPetExpenses(transactions);
  const discretionary = getDiscretionaryExpenses(transactions);
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const pieData = {
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ["#49be25", "#c91919"],
        borderColor: ["#297113", "#620a0a"],
        borderWidth: 2,
      },
    ],
    labels: ["Income", "Expenses"],
  };

  const barData = {
    labels: [
      "House",
      "Car",
      "Utilities",
      "Medical Expenses",
      "Groceries",
      "Pets",
      "Discretionary",
    ],
    datasets: [
      {
        data: [house, car, utility, medical, grocery, pets, discretionary],
        backgroundColor: [
          "#6b0f9f",
          "#cf6f0c",
          "#087555",
          "#4deaf5",
          "#067ba4",
          "#7a7a3b",
          "#b6194b",
        ],
        borderColor: [
          "#420962",
          "#844607",
          "#06503a",
          "#32989f",
          "#034d68",
          "#505027",
          "#7c1133",
        ],
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="container app-body py-5">
      <div className="container">
        <div className="text-center">
          <h1>
            <FaChartPie /> Graphs
          </h1>
        </div>
      </div>
      <div className="row align-items-center justify-content-center text-center my-3">
        <h2>Income vs. Expenses</h2>
        <div className="col-lg-5">
          <Pie data={pieData} />
        </div>
      </div>
      <div className="row align-items-center justify-content-center text-center my-4">
        <h2>Expense Breakdown</h2>
        <div className="col-lg-8">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Graphs;

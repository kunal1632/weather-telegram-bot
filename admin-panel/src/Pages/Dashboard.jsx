import { useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

import ApiKeys from "../Components/common/ApiKeys";
import Users from "../Components/common/Users";

const Dashboard = () => {
  //   function to handle deleteion of a chips
  // const handlDeleteChip = (chipIndex) => {
  //   const newChips = chips.filter((_, index) => index !== chipIndex);
  //   setChips(newChips);
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-11/12 mx-auto min-h-screen flex flex-col">
      <div className="mt-11 flex items-center justify-between w-full mx-auto">
        {" "}
        <h1 className="text-4xl text-white font-bold ">Dashboard</h1>
        <button
          onClick={() => {
            dispatch(logout(navigate));
          }}
          className="text-white bg-slate-700 px-3 py-2 rounded-lg hover:bg-slate-800 transition-all duration-200 border border-slate-600"
        >
          Logout
        </button>
      </div>
      <p className="text-2xl text-white text-center mt-5">
        This is the dashboard for the telegram bot which you can find{" "}
        <a
          href="https://t.me/daily_weather_subscription_bot"
          target="_blank"
          rel="noreferrer noopener"
          className="text-blue-500"
        >
          here
        </a>
        .
      </p>

      <ApiKeys />
      <Users />
    </div>
  );
};

export default Dashboard;

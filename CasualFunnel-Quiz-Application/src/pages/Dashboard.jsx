import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { Progress } from "antd";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(userContext);
  const { optionsHistory } = userInfo;

  const correctAns = location.state.map((item) => item.correct_answer);
  const selectedAns = Object.values(optionsHistory);

  let correct = 0;
  for (let i = 0; i < correctAns.length; i++) {
    if (correctAns[i] == selectedAns[i]) {
      correct++;
    }
  }

  const getSuggestion = (score) => {
    if (score < 35) {
      return "You need to work hard";
    } else if (score > 35 && score < 60) {
      return "You can do better";
    } else if (score > 60 && score < 80) {
      return "You are doing good";
    } else if (score > 80 && score < 100) {
      return "You are doing great";
    } else if (score == 100) {
      return "You are a genius";
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 py-8 px-4">
      <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center justify-between text-xl font-bold mb-8">
        <div className="py-6 md:py-12 text-center md:text-left">
          <h1 className="text-2xl font-semibold text-gray-800">Hi, {userInfo.username}</h1>
          <h2 className="text-lg text-gray-600">{userInfo.email}</h2>
        </div>
        <div className="flex flex-col items-center gap-4 p-5">
          <Progress type="circle" percent={Math.round((correct / 15) * 100)} />
          <h2 className="text-2xl text-gray-700">{correct} / 15</h2>
        </div>
      </div>

      <div className="w-[80%] text-center mb-8">
        <h1 className="text-2xl font-bold text-white bg-purple-500 px-8 py-2 rounded-md animate-pulse">
          {getSuggestion((correct / 15) * 100)}!
        </h1>
      </div>

      <div className="w-full md:w-[80%] flex flex-col items-center mb-6">
        {correctAns.map((item, i) => {
          return (
            <div key={i} className="flex flex-col items-center gap-4 mt-2 md:px-4 border-b-2 py-4 w-full">
              <p className="flex gap-4 w-full text-gray-700">
                <h1 className="text-xl">{i + 1}.</h1>
                {location.state[i]?.question}
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-2 px-4">
                <div
                  className={`flex items-center justify-start gap-5 px-4 py-2 rounded-md text-white shadow-md ${correctAns[i] === selectedAns[i] ? "bg-green-600" : "bg-red-500"}`}
                >
                  <p>
                    Your answer: {optionsHistory[i] ? optionsHistory[i] : "Not attempted"}
                  </p>
                </div>
                <h2 className="px-4 py-2 rounded-md bg-gray-400 text-white shadow-md">
                  Correct answer: {item}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="mt-5 px-6 py-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 transition-all duration-300"
        onClick={() => {
          setUserInfo({
            ...userInfo,
            qIndex: 0,
            correctAns: 0,
            attempted: 0,
            optionsHistory: {},
          });
          navigate("/", { replace: true });
          window.location.reload();
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export default Dashboard;

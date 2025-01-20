import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import CountdownTimer from "../components/Counter";
import axios from "axios";
import Questions from "../components/Questions";

const HomePage = () => {
  const { userInfo, setUserInfo } = useContext(userContext);
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const res = await axios.get("https://opentdb.com/api.php?amount=15");
      if (res.data.response_code === 0) {
        setQuestions(res.data.results);
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="hidden md:block text-lg font-semibold text-gray-700">
          <span>Questions Attempted: </span>
          {userInfo?.attempted}
        </div>

        {/* Centered Clock */}
        <div className="flex-grow flex justify-start items-center pl-12">
          <CountdownTimer questions={questions} />
        </div>
      </header>

      {/* Main Content Section */}
      <div className="flex flex-grow">
        {/* Questions Section */}
        <main className="flex-grow p-6 overflow-y-auto">
          <Questions questions={questions} />
        </main>

        {/* Drawer-like Section for Question Grid */}
        <aside className="w-1/4 bg-white shadow-md p-6 flex-shrink-0">
          <div className="mb-4">
            <div className="flex justify-around">
              <span className="bg-green-200 px-2 py-1 rounded">Easy</span>
              <span className="bg-yellow-300 px-2 py-1 rounded">Medium</span>
              <span className="bg-red-500 px-2 py-1 rounded text-white">Hard</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {questions.map((_, i) => (
              <div
                key={i}
                onClick={() => setUserInfo({ ...userInfo, qIndex: i })}
                className="flex items-center justify-center px-4 py-2 rounded-md cursor-pointer text-center text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;

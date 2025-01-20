import { useContext, useEffect, useState } from "react";
import userContext from "../context/userContext";
import { Modal, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

const Questions = ({ questions }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { userInfo, setUserInfo } = useContext(userContext);
  const { qIndex, optionsHistory } = userInfo;
  const [selected, setSelected] = useState(optionsHistory[qIndex] || null);

  const shuffleOptions = (option) => {
    return option.sort();
  };

  useEffect(() => {
    if (optionsHistory[qIndex] != null) {
      setSelected(optionsHistory[qIndex]);
    }
  }, [qIndex]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    navigate("/result", { replace: true, state: questions });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const selectedOption = (option) => {
    setSelected(option);
    optionsHistory[qIndex] = option;

    let atteptedNo = 0;
    for (let opt in optionsHistory) {
      if (optionsHistory[opt] != null) {
        atteptedNo++;
      }
    }

    if (selected == questions[qIndex]?.correct_answer) {
      setUserInfo({
        ...userInfo,
        correctAns: userInfo.correctAns + 1,
        attempted: atteptedNo,
      });
    } else {
      setUserInfo({
        ...userInfo,
        attempted: atteptedNo,
      });
    }
  };

  const nextQuestion = () => {
    if (qIndex >= questions.length - 1) {
      message.success("Quiz Completed");
      showModal();
      return;
    }
    setUserInfo({
      ...userInfo,
      qIndex: qIndex + 1,
    });
    setSelected(null);
  };

  const prevQuestion = () => {
    if (qIndex == 0) {
      return;
    }
    setUserInfo({
      ...userInfo,
      qIndex: qIndex - 1,
    });
  };

  if (questions.length === 0)
    return (
      <Spin
        style={{
          marginTop: "12%",
        }}
        tip="Loading"
        size="large"
      >
        <div className="content" />
      </Spin>
    );

  return (
    <div
      className={
        "main-container  mx-5  py-6 px-12 md:w-1/2  md:mx-auto mt-10 rounded-xl shadow-md flex flex-col items-center justify-between" +
        (questions[qIndex]?.difficulty == "easy"
          ? " bg-green-100"
          : questions[qIndex]?.difficulty == "medium"
          ? " bg-yellow-300"
          : " bg-red-300")
      }
    >
      <h1 className="font-medium text-xl text-black pb-3">
        Category - {questions[qIndex]?.category}
      </h1>
      <h1 className="font-serif font-bold text-2xl text-gray-800 py-4">
        {qIndex + 1}. {questions[qIndex]?.question}
      </h1>
      <div className="grid grid-cols-2 items-center justify-center gap-4 py-4">
        {shuffleOptions([
          ...questions[qIndex]?.incorrect_answers,
          questions[qIndex]?.correct_answer,
        ]).map((option, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                selectedOption(option);
              }}
              className={
                " px-2 py-2 text-center rounded-xl shadow-md cursor-pointer hover:bg-purple-600 hover:scale-110 hover:text-white hover:shadow-lg transition duration-300 ease-in-out" +
                (selected == option
                  ? " bg-purple-800 text-white border border-white"
                  : " bg-white")
              }
            >
              {i == 0
                ? "A"
                : i == 1
                ? "B"
                : i == 2
                ? "C"
                : i == 3
                ? "D"
                : ""} : {option}
            </div>
          );
        })}
      </div>

      <div className="flex w-full justify-between items-center mt-3">
        {qIndex == 0 ? (
          <div></div>
        ) : (
          <button
            onClick={prevQuestion}
            className="flex items-center w-28 justify-center h-12 text-sm bg-purple-800 text-white gap-2 px-4 rounded-md shadow-lg  transition duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
            Previous{" "}
          </button>
        )}
        <button
          onClick={nextQuestion}
          className="flex items-center w-28 justify-center h-12 bg-purple-800 text-white gap-2 px-4 rounded-md shadow-lg  transition duration-300 ease-in-out"
        >
          {qIndex == questions.length - 1 ? "Submit" : "Next"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <Modal
        okText="Submit"
        title=""
        okType="info"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{
          top: "30%",
          height: "fit-content",
          width: "400px",
        }}
      >
        <p style={{ fontSize: "16px", padding: "20px" }}>
          Do you want to submit the quiz?
        </p>
      </Modal>
    </div>
  );
};

export default Questions;

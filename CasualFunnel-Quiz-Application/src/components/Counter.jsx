import { useState, useRef, useEffect } from "react";
import ClockAnimation from "../assets/animation_lmt8wlwk.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

const CountdownTimer = ({ questions }) => {
  const Ref = useRef(null);
  const navigate = useNavigate();
  const [timer, setTimer] = useState("00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  // function to clear timer and start again
  const clearTimer = (e) => {
    setTimer("00:00");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  // function to get deadline time 30 minutes from now in seconds
  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 1800);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    // stop quiz
    clearTimer(getDeadTime());
  };

  // if timer reaches 00:01 then navigate to result page, stop quiz
  if (timer === "00:01") {
    navigate("/result", { replace: true, state: questions });
  }
  
  return (
    <div
      className="border rounded-md content-center text-black
      px-4 py-2 flex items-center gap-2 w-[180px]"
    >
      <Lottie
        className="h-1/2 md:h-full"
        animationData={ClockAnimation}
        loop={true}
      />
      <h2 className="text-3xl text-center">{timer}</h2>
    </div>
  );
};

export default CountdownTimer;

import { useContext, useState } from "react";
import Lottie from "lottie-react";
import userAnimation from "../assets/quiz.json";
import userContext from "../context/userContext";
import { Modal, message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { setUserInfo } = useContext(userContext);

  const navigate = useNavigate();

  const handleClick = () => {
    setUserInfo({
      username,
      email,
      correctAns: 0,
      attempted: 0,
      qIndex: 0,
      optionsHistory: {},
    });
    if (username === "" || email === "" || !email.includes("@")) {
      messageApi.info("Please enter a valid email and username!");
    } else {
      showModal();
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    navigate("/home");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div
      data-testid="register-page"
      className="h-screen w-screen flex flex-col md:flex-row items-center justify-center"
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp2552372.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {contextHolder}
      <Lottie className="h-1/2 md:h-full" animationData={userAnimation} loop={true} />
      <div className="md:w-1/3 flex flex-col items-end justify-center border rounded-md px-6 py-8 shadow-md bg-white">
        <div className="w-full flex flex-col items-start">
          <h1 className="font-bold text-2xl mx-auto">CasualFunnel QUIZ</h1>
          <label htmlFor="name" className="mt-4">User Name</label>
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            name="username"
            className="outline-none border border-blue-400 focus:border-blue-600 rounded-md px-4 py-2 mt-1 w-full"
          />
        </div>
        <div className="w-full flex flex-col items-start mt-5">
          <label htmlFor="name">Email</label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            className="outline-none border border-blue-400 focus:border-blue-600 rounded-md px-4 py-2 mt-1 w-full"
          />
        </div>
        <button
          onClick={handleClick}
          className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 w-[120px] hover:text-white font-bold py-2 px-4 rounded-md mt-8 transition duration-300 ease-in-out hover:scale-95"
        >
          Start
        </button>
      </div>
      <Modal
        okText="Confirm"
        title="Welcome to CasualFunnel Quiz"
        okType="info"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ top: "20%", maxWidth: "500px", width: "80%" }} // Increased modal size
        bodyStyle={{ padding: "20px", fontSize: "16px", textAlign: "center" }} // Added padding to body
        footer={[
          <button
            key="confirm"
            onClick={handleOk}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Confirm
          </button>,
        ]}
      >
        <p>Your Timer will start once you click <span className="text-red-700 font-bold">CONFIRM</span></p>
      </Modal>
    </div>
  );
};

export default Register;

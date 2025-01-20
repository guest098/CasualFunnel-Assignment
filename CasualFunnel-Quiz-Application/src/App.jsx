import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import userContext from "./context/userContext";
import Register from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/result",
    element: <Dashboard />,
  },
]);

function App() {
  const [userInfo,setUserInfo]=useState("");
  return(
    <userContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      <RouterProvider router={router} />;
    </userContext.Provider>
  );
}

export default App;

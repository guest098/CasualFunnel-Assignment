import { createContext } from "react";

const userContext = createContext({
  username: "",
  email: "",
  correctAns: 0,
  attempted: 0,
  qIndex: 0,
  optionsHistory: {},
});

export default userContext;

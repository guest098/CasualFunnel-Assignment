/** @jest-environment jsdom */
import { render } from "@testing-library/react";
import Register from "../pages/RegisterPage";
import { StaticRouter } from "react-router-dom/server";
import "jest-canvas-mock";
import { fireEvent } from "@testing-library/react";
import userContext from "../context/userContext";

test("two inputs fields", () => {
  const header = render(
    <StaticRouter>
      <userContext.Provider
        value={{
          userInfo: "",
          setUserInfo: () => {},
        }}
      >
        <Register />
      </userContext.Provider>
    </StaticRouter>
  );
  const input = header.getAllByRole("textbox");
  expect(input).toHaveLength(2);
});

test("check valid email", () => {
  const header = render(
    <StaticRouter>
      <userContext.Provider
        value={{
          userInfo: "",
          setUserInfo: () => {},
        }}
      >
        <Register />
      </userContext.Provider>
    </StaticRouter>
  );
  const input = header.getAllByRole("textbox");

  input[0].value = "test";
  input[1].value = "test";

  const button = header.getByRole("button");
  fireEvent.click(button);
});

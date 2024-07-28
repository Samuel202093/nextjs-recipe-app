import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { RouterContextProvider } from "./customRouterContext";
import React from "react";

const customRender = (ui: ReactElement, routerOptions = {}) => {
  return render(
    <RouterContextProvider router={routerOptions}>{ui}</RouterContextProvider>
  );
};

export * from "@testing-library/react";
export { customRender as render };

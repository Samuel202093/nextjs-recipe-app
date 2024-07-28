import { createContext, useContext, ReactNode } from "react";
import { NextRouter } from "next/router";
import { createMockRouter } from "../mockRouter";
import React from "react";

const RouterContext = createContext<NextRouter>(createMockRouter({}));

export const useRouter = () => useContext(RouterContext);

export const RouterContextProvider = ({
  children,
  router,
}: {
  children: ReactNode;
  router: Partial<NextRouter>;
}) => {
  return (
    <RouterContext.Provider value={createMockRouter(router)}>
      {children}
    </RouterContext.Provider>
  );
};

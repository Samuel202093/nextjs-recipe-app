import { NextRouter } from 'next/router';
import React from 'react';

export const RouterContext = React.createContext<NextRouter | null>(null);

type RouterContextProviderProps = {
  children: React.ReactNode;
  router: NextRouter;
};

export const RouterContextProvider: React.FC<RouterContextProviderProps> = ({ children, router }) => {
  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
};

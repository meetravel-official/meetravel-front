import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { cssGlobalStyle } from "@/styles/globalStyle";

import { MainLayout } from "./components/MainLayout/MainLayout";
import reportWebVitals from "./reportWebVitals";
import { containerRoutes, pageRoutes } from "./routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: pageRoutes.ROOT,
    element: <MainLayout />,
    children: [{ path: pageRoutes.ROOT, Component: containerRoutes.MAIN }],
  },
  { path: pageRoutes.SAMPLE, Component: containerRoutes.SAMPLE },
]);

root.render(
  <React.StrictMode>
    <Global styles={cssGlobalStyle} />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

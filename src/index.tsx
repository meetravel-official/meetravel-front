import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout, Meta, SimpleLayout } from "@/components";
import { cssGlobalStyle } from "@/styles/globalStyle";

import reportWebVitals from "./reportWebVitals";
import { containerRoutes, pageRoutes } from "./routes";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as HTMLElement);

const router = createBrowserRouter([
  {
    path: pageRoutes.ROOT,
    element: <MainLayout />,
    children: [
      { path: pageRoutes.ROOT, Component: containerRoutes.HOME },
      { path: pageRoutes.CHAT, Component: containerRoutes.CHAT },
      { path: pageRoutes.SHOP, Component: containerRoutes.SHOP },
      { path: pageRoutes.PROFILE, Component: containerRoutes.PROFILE },
    ],
  },
  {
    element: <SimpleLayout />,
    children: [
      { path: pageRoutes.SIGN_IN, Component: containerRoutes.SIGN_IN },
    ],
  },
]);

if (container?.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <HelmetProvider>
      <React.StrictMode>
        <Meta />
        <Global styles={cssGlobalStyle} />
        <RouterProvider router={router} />
      </React.StrictMode>
    </HelmetProvider>
  );
} else
  root.render(
    <HelmetProvider>
      <React.StrictMode>
        <Meta />
        <Global styles={cssGlobalStyle} />
        <RouterProvider router={router} />
      </React.StrictMode>
    </HelmetProvider>
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

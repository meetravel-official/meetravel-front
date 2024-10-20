import "react-toastify/dist/ReactToastify.css";

import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { BackLayout, MainLayout, Meta, SimpleLayout } from "@/components";
import { cssGlobalStyle } from "@/styles/globalStyle";

import { ChatLayout } from "./components/ChatLayout/ChatLayout";
import { ChatListLayout } from "./components/ChatListLayout/ChatListLayout";
import { HomeLayout } from "./components/HomeLayout/HomeLayout";
import { ProfileLayout } from "./components/ProfileLayout/ProfileLayout";
import { SignUpLayout } from "./components/SignUpLayout/SignUpLayout";
import { TravelInfoLayout } from "./components/TravelInfoLayout/TravelInfoLayout";
import reportWebVitals from "./reportWebVitals";
import { containerRoutes, pageRoutes } from "./routes";

declare global {
  interface Window {
    kakao: any;
  }
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as HTMLElement);

const router = createBrowserRouter([
  {
    element: <ChatListLayout />,
    children: [{ path: pageRoutes.CHAT, Component: containerRoutes.CHAT }],
  },
  {
    path: pageRoutes.ROOT,
    element: <HomeLayout />,
    children: [
      { path: pageRoutes.ROOT, Component: containerRoutes.HOME },
      { path: pageRoutes.SEARCH, Component: containerRoutes.SEARCH },
    ],
  },
  {
    element: <TravelInfoLayout />,
    children: [
      { path: pageRoutes.TRAVEL_INFO, Component: containerRoutes.TRAVEL_INFO },
    ],
  },
  {
    element: <ProfileLayout />,
    children: [
      { path: pageRoutes.PROFILE, Component: containerRoutes.PROFILE },
    ],
  },
  {
    element: <BackLayout />,
    children: [
      { path: pageRoutes.SETTING, Component: containerRoutes.SETTING },
      {
        path: pageRoutes.NOTIFICATION,
        Component: containerRoutes.NOTIFICATION,
      },
      {
        path: pageRoutes.LIKE_PLACE,
        Component: containerRoutes.LIKE_PLACE,
      },
    ],
  },
  {
    element: <ChatLayout />,
    children: [
      {
        path: `${pageRoutes.CHAT}/:chatId`,
        Component: containerRoutes.CHAT_ROOM,
      },
    ],
  },
  {
    element: <SignUpLayout />,
    children: [
      {
        path: pageRoutes.SIGN_UP,
        Component: containerRoutes.SIGN_UP,
      },
    ],
  },
  {
    element: <SimpleLayout />,
    children: [
      { path: pageRoutes.SIGN_IN, Component: containerRoutes.SIGN_IN },
      { path: pageRoutes.AUTH_CHECK, Component: containerRoutes.AUTH_CHECK },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      { path: pageRoutes.NOTFOUND, Component: containerRoutes.NOTFOUND },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
      retry: false,
    },
  },
});

root.render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <React.StrictMode>
        <Meta />
        <Global styles={cssGlobalStyle} />
        <RouterProvider router={router} />
        <ToastContainer />
      </React.StrictMode>
    </QueryClientProvider>
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./main.css";

import Index from "./paths/index";
import Callback from "./paths/callback/callback";
import ErrorPage from "./error";

const LoadingPage = () => <>Loading...</>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/callback",
    element: <Callback />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Suspense fallback={<LoadingPage />}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </React.Suspense>
);

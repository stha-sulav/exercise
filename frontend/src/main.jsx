import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes/routes.jsx";
import { WorkoutContextProvider } from "./context/WorkoutContext.jsx";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutContextProvider>
      <RouterProvider router={router} />
    </WorkoutContextProvider>
  </React.StrictMode>
);

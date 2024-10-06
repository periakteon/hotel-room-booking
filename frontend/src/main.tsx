import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.tsx";
import { Toaster } from "@/components/ui/sonner";
import ErrorPage from "./error-page.tsx";
import ListRooms from "./routes/list.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list",
    element: <ListRooms />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster closeButton />
    <RouterProvider router={router} />
  </StrictMode>
);

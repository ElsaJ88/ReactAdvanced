import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import { AddEvent } from "./pages/AddEvent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as usersAndCategoriesLoader } from "./components/Root";
import { theme } from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: usersAndCategoriesLoader,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsLoader,
      },
      {
        path: "/addevent",
        element: <AddEvent />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

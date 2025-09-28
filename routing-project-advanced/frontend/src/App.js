import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainRoot from "./pages/MainRoot";
import HomePage from "./pages/HomePage";
import EventsRootPage from "./pages/EventsRoot";
import EventsPage, {loader as eventsLoader} from "./pages/Events";
import EventDetailPage, {loader as EventDetailLoader} from "./pages/EventDetailPage";
import { deleteEvent } from "./components/EventItem";
import NewEventPage, {createEvent} from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "events",
        element: <EventsRootPage />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader
          },
          {
            path: ":eventId",
            id: "event-details",//this is an identifier for this route path
            loader: EventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEvent,
              },
              {
                path: "edit",
                element: <EditEventPage />
              }
            ]
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: createEvent
          }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

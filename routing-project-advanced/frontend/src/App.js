import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainRoot from "./pages/MainRoot";
import HomePage from "./pages/HomePage";
import EventsRootPage from "./pages/EventsRoot";
import EventsPage, {loader as eventsLoader} from "./pages/Events";
import EventDetailPage, {loader as EventDetailLoader} from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoot />,
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
            element: <EventDetailPage />,
            loader: EventDetailLoader,
            children: [
              {
                path: "edit",
                element: <EditEventPage />
              }
            ]
          },
          {
            path: "new",
            element: <NewEventPage />
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

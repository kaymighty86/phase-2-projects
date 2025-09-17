import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutWrapper from "./components/LayoutWrapper";
import Home from "./components/pages/HomePage";
import ErrorPage from "./components/pages/ErrorPage";
import Products from "./components/pages/ProductsPage";
import ProductDetailsPage from "./components/pages/ProductDetailsPage";
import Contact from "./components/pages/ContactPage";

//create a router object and declare the different routes and their components
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,//this means it is the default sub-path for this path, it is the same as setting "path" to "" empty string
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "products/:productId",
        element: <ProductDetailsPage />
      }
    ]
  }
]);


function App() {
  return <main><RouterProvider router={router}/></main>
}

export default App;

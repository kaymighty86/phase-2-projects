import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

const BlogPage = lazy(() => import("./pages/Blog"));
const PostPage = lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { 
            index: true, 
            element: 
              <Suspense fallback = {<p>Loading...</p>}>
                <BlogPage />
              </Suspense>, 
            loader: ()=> import("./pages/Blog").then(module => module.loader())//this is a dynamic import style for deffering module/script imports, when the "import" function is executed it returns a promise that when its resolved, it will pass the downloaded module (script)
          },
          { 
            path: ':id', 
            element: 
              <Suspense fallback = {<p>Loading...</p>}>
                <PostPage />
              </Suspense>, 
            loader: (meta)=> import("./pages/Post").then(module => module.loader(meta))//the "meta" being forwarded is that object that provides the "request" and "params" objects to the loader  
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import Books from "../pages/AllBooks";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";
import Signin from "../pages/Signin";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage"
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";

const router = createBrowserRouter([

{
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "all-books",
        element: <AllBooks></AllBooks>,
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
     
    ],
},

    {
        path: "/sign-up",
        element: <SignUp></SignUp>,
    },
    {
        path: "/sign-in",
        element: <Signin></Signin>,
    },

      {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },

    ]);

    export default router;

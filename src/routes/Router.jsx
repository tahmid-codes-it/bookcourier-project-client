import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import AboutUs from "../pages/AboutUs";
import BookDetails from "../pages/BookDetails";
import SignUp from "../pages/SignUp";
import Signin from "../pages/Signin";

// 👤 User pages
import MyProfile from "../pages/user/MyProfile";
import MyOrders from "../pages/user/MyOrders";
import Invoices from "../pages/user/Invoices";

// 📚 Librarian pages
import AddBook from "../pages/librarian/AddBook";
import MyBooks from "../pages/librarian/MyBooks";
import AllOrders from "../pages/librarian/AllOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      { path: "all-books", element: <AllBooks /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "all-books/:id", element: <BookDetails /> },

      // 👤 USER ROUTES
      { path: "profile", element: <MyProfile /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "invoices", element: <Invoices /> },

      // 📚 LIBRARIAN ROUTES
      { path: "add-book", element: <AddBook /> },
      { path: "my-books", element: <MyBooks /> },
      { path: "all-orders", element: <AllOrders></AllOrders> },
    ],
  },

  // 🔐 Auth routes
  { path: "/sign-up", element: <SignUp /> },
  { path: "/sign-in", element: <Signin /> },

  // ❌ 404
  { path: "*", element: <ErrorPage /> },
]);

export default router;

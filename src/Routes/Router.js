import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Blog from "../Pages/Blogs/Blog";
import AddProduct from "../Pages/Dashboard/AddProduct";
import AllUsers from "../Pages/Dashboard/AllUsers";
import MyBuyers from "../Pages/Dashboard/MyBuyers";
import MyOrders from "../Pages/Dashboard/MyOrders";
import ReportedItems from "../Pages/Dashboard/ReportedItems";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import MyProducts from "../Pages/MyProducts/MyProducts";
import Products from "../Pages/Products/Products";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "/blog", element: <Blog></Blog> },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <Products></Products>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage></ErrorPage>,
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <MyOrders></MyOrders> },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/reporteditems",
        element: (
          <AdminRoute>
            <ReportedItems></ReportedItems>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/mybuyers",
        element: (
          <SellerRoute>
            <MyBuyers></MyBuyers>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
    ],
  },
]);

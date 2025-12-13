import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetails from "../Pages/BookDetails/BookDetails";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Components/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyOrders from "../Pages/User/MyOrders";
import Profile from "../Pages/User/Profile";
import Invoices from "../Pages/User/Invoices";
import AddBook from "../Pages/Librarian/AddBook";
import MyBook from "../Pages/Librarian/MyBook";
import Orders from "../Pages/Librarian/Orders";
import AllUsers from "../Pages/Admin/AllUsers";
import ManageBooks from "../Pages/Admin/ManageBooks";
import AdminProfile from "../Pages/Admin/AdminProfile";

 export const router = createBrowserRouter([
   {
     path: "/",
     Component: RootLayout,
     children: [
       {
         index: true,
         Component: Home,
       },
       {
         path: "/allBooks",
         Component: AllBooks,
       },
       {
         path: "/books/:id",
         element: (
           <PrivateRoute>
             <BookDetails></BookDetails>
           </PrivateRoute>
         ),
       },
     ],
   },
   {
     path: "/dashboard",
     element: (
       <PrivateRoute>
         <DashboardLayout></DashboardLayout>
       </PrivateRoute>
     ),
     children: [
       { path: "my-orders", element: <MyOrders /> },
       { path: "profile", element: <Profile /> },
       { path: "invoices", element: <Invoices /> },

       { path: "add-book", element: <AddBook /> },
       { path: "my-books", element: <MyBook /> },
       { path: "orders", element: <Orders /> },

       // Admin routes
       { path: "all-users", element: <AllUsers /> },
       { path: "manage-books", element: <ManageBooks /> },
       { path: "admin-profile", element: <AdminProfile /> },
     ],
   },
   {
     path: "/auth",
     element: <AuthLayout></AuthLayout>,
     children: [
       {
         path: "/auth/login",
         element: <Login></Login>,
       },
       {
         path: "/auth/register",
         element: <Register></Register>,
       },
     ],
   },
   {
     path: "*",
     Component: ErrorPage,
   },
 ]);

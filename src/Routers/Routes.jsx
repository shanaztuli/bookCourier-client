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
import DashboardRedirect from "../Pages/Dashboard/DashboardRedirect";
import PaymentSuccess from "../Pages/payment/PaymentSuccess";
import PaymentCanceled from "../Pages/payment/PaymentCanceled";
import AdminRoute from "./AdminRoute";
import LibrarianRoute from "./LibrarianRoute";
import MyWishlist from "../Pages/User/MyWishlist";

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
       { index: true, element: <DashboardRedirect /> },
       { path: "my-orders", element: <MyOrders /> },

       { path: "payment-success", element: <PaymentSuccess /> },
       { path: "payment-cancelled", element: <PaymentCanceled /> },
       { path: "profile", element: <Profile /> },
       { path: "invoices", element: <Invoices /> },
       { path: "myWishlist", element: <MyWishlist /> },

       {
         path: "add-book",
         element: (
           <LibrarianRoute>
             <AddBook />
           </LibrarianRoute>
         ),
       },
       {
         path: "my-books",
         element: (
           <LibrarianRoute>
             <MyBook />
           </LibrarianRoute>
         ),
       },
       {
         path: "orders",
         element: (
           <LibrarianRoute>
             {" "}
             <Orders />
           </LibrarianRoute>
         ),
       },

       // Admin routes
       {
         path: "all-users",
         element: (
           <AdminRoute>
             <AllUsers />
           </AdminRoute>
         ),
       },
       {
         path: "manage-books",
         element: (
           <AdminRoute>
             <ManageBooks />
           </AdminRoute>
         ),
       },
       {
         path: "admin-profile",
         element: (
           <AdminRoute>
             <AdminProfile />
           </AdminRoute>
         ),
       },
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

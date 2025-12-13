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
         path:'/allBooks',
         Component: AllBooks,
       },
       {
         path:'/books/:id',
         element:<PrivateRoute><BookDetails></BookDetails></PrivateRoute>
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
    path:'*',
    Component:ErrorPage
   }
 ]);

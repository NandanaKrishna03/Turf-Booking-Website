import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import Turf from "../pages/user/Turf";
import TurfDetails from "../pages/user/TurfDetails";
import ErrorPage from "../pages/shared/ErrorPage";
import { Login } from "../pages/shared/Login";
import { Signup } from "../pages/shared/Signup";
import ManagerLayout from "../layout/ManagerLayout";
import { Profile } from "../pages/user/Profile";
import { ProtectedRoute} from "./ProtectedRoutes";
import { ProtectedRouteManager } from "./ProtectedRouteManager";

import { EditProfile } from "../pages/user/EditProfile";
import { ChangePassword } from "../pages/user/changePassword";
import { DeactivateAccount } from "../pages/user/deactivate";
import { MyBookings } from "../pages/user/MyBooking";
import { EditManagerProfile } from "../pages/manager/profileUpdate";
import { ManagerDashboard } from "../pages/manager/ManagerDashBoard";
import { TurfBookings } from "../pages/manager/TurfBookings";
import  MyTurfs  from "../pages/manager/MyTurf";

import { CreateBooking } from "../pages/user/CreateBooking";
import { AddTurf } from "../pages/manager/AddTurf";
import { UpdateTurf } from "../pages/manager/UpdateTurf";
import { DeleteTurf } from "../pages/manager/Deleteturf";





export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "user/signup",
        element: <Signup />,
      },
      {
        path: "user/login",
        element: <Login />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "turfs",
        element: <Turf />,
      },
      {
        path: "turfDetails/:turfId",
        element: <TurfDetails />,
      },
      
      {
        element:<ProtectedRoute/>,
        path: "user",
        children: [
          {
            path: "cart",
            // element: <Cart />,
          },
          {
            path: "profile",
            element: <Profile/>,
          },
          {
            path: "profile-update",
            element: <EditProfile/>,
          },
          {
            path: "change-password",
            element: <ChangePassword/>,
          },
          {
            path: "account-deactivate",
            element: <DeactivateAccount/>,
          },
          {
            path: "get-bookings",
            element: <MyBookings/>,
          },
          {
            path: "create-booking/:turfId",
             element: <CreateBooking/>,
          },
          
          {
            path: "payment/success",
            // element: <h2>Payment success</h2>,
          },
        ],
      },
    ],
  },
  {
    path: "manager",
    element: <ManagerLayout />,
    errorElement: <ErrorPage role={'manager'} />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login role="manager" />,
      },
      {
        path:"notification",
        //element:
      },{
        element:<ProtectedRouteManager/>,
        path: "",
        children: [
          
          {
            path: "dashboard",
            element: <ManagerDashboard /> ,
          },
          {
            path: "profile-update",
            element: <EditManagerProfile/>,
          },
          {
            path: "turf-bookings/:turfId",
             element:<TurfBookings />,
          },
          {
            path: "add-turf",
             element:<AddTurf />,
          },
          {
            path: "turfs",
            element: <MyTurfs />,  // ✅ Now MyTurfs is accessible
        },
        {
          path: "update-turf/:id",  // Accepts turf ID as a parameter
          element: <UpdateTurf />,
        },
        {
          path: "delete-turf/:id",  // Accepts turf ID as a parameter
          element: <DeleteTurf />,
        },
        
        ],
      },
    ],
  },
]);

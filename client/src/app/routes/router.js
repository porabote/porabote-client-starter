import React from "react";
import {createBrowserRouter} from "react-router-dom";
import RouteErrorPage from "@/components/layout/route-error-page";
import NavsContainer from "@/components/navs";
import DefaultLayout from "@/components/layout/default-layout";
import Stats from "@/components/stats";
import SignupForm from "@/app/auth/templates/signup-form";
import SigninForm from "@/app/auth/templates/signin-form";
import YandexMetrika from "@/components/stats/yandex-metrika/yandex-metrika";
import AuthLayout from "@/components/layout/auth-layout";
import PasswordForgotForm from "../auth/templates/password-forgot-form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/navs/:action?", element: <NavsContainer/>},
     // {path: "/profile", element: <Profile/>},
    ],
  },
  {
    path: "/stats",
    element: <DefaultLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/stats/yandex", element: <YandexMetrika/>},
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/auth/signIn", element: <SigninForm/>},
      {path: "/auth/signUp", element: <SignupForm/>},
      {path: "/auth/forgotPassword", element: <PasswordForgotForm/>},
    ],
  },
]);

export default router;
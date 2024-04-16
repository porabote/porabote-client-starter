import React from "react";
import {createBrowserRouter} from "react-router-dom";
import RouteErrorPage from "@/components/layout/route-error-page";
import DefaultLayout from "@/components/layout/default-layout";
import SignupForm from "@/components/auth/templates/signup-form";
import SigninForm from "@/components/auth/templates/signin-form";
import YandexMetrika from "@/components/stats/yandex-metrika/yandex-metrika";
import AuthLayout from "@/components/layout/auth-layout";
import PasswordForgotForm from "@/components/auth/templates/password-reset-by-email-page";
import FeedGuests from "@/components/guests/feed/feed-container";
import GuestsProfile from "@/components/guests/profile/profile-container";
import NavsFeed from "@/components/navs/feed";
import CashierFeed from "@/components/payments/cashier/feed/feed-container";
import CheckinsFeed from "@/components/checkins/feed/feed-container";
import OffersFeed from "@/components/offers/feed";
import PointsAccrualsFeed from "@/components/points/accruals/container";
import PointsWriteoffsFeed from "@/components/points/writeoffs/container";
import UsersFeed from "@/components/users/admin/feed/feed-container";
import AdminUsersProfile from "@/components/users/admin/profile/container";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/navs", element: <NavsFeed/>},
      {path: "/offers", element: <OffersFeed/>},
    ],
  },
  {
    path: "/guests",
    element: <DefaultLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/guests", element: <FeedGuests/>},
      {path: "/guests/profile/:id", element: <GuestsProfile/>},
    ],
  },
  {
    path: "/points",
    element: <DefaultLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/points/accruals", element: <PointsAccrualsFeed/>},
      {path: "/points/spending", element: <PointsWriteoffsFeed/>},
    ],
  },
  {
    path: "/payments",
    element: <DefaultLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/payments/cashier", element: <CashierFeed/>},
    ],
  },
  {
    path: "/checkins",
    element: <DefaultLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/checkins", element: <CheckinsFeed/>},
    ],
  },
  {
    path: "/checkins",
    element: <DefaultLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/checkins", element: <CheckinsFeed/>},
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
  {
    path: "/admin",
    element: <DefaultLayout/>,
    errorElement: <RouteErrorPage/>,
    children: [
      {path: "/admin/users", element: <UsersFeed/>},
      {path: "/admin/users/profile/:id", element: <AdminUsersProfile/>},
    ],
  },
]);

export default router;
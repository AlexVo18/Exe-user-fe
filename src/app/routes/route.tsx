import { Route, Routes, createBrowserRouter } from "react-router-dom";
import MainAdminLayout from "../pages/Admin/MainAdminLayout";
import MainLayout from "../pages/Users/MainLayout";
import LoginLayout from "../pages/Users/LoginLayout";
import { Suspense, lazy } from "react";


// *** Lazy Routes (Tất cả các route ngoài trừ layout sẽ import vào đây) ***
const Home = lazy(() => import("../pages/Users/homePage/Home"));
const About = lazy(() => import("../pages/Users/aboutPage/About"));
const News = lazy(() => import("../pages/Users/newsPage/News"));
const Sponsor = lazy(() => import("../pages/Users/sponsorPage/Sponsor"));
const Packs = lazy(() => import("../pages/Users/packsPage/Packs"));
const Donation = lazy(() => import("../pages/Users/donationPage/Donation"));
const Loading = lazy(() => import("../pages/loadingPage/Loading"));

const Login = lazy(() => import("../pages/authPages/Login"));
const ForgotPassword = lazy(() => import("../pages/authPages/ForgotPassword"));
const Recover = lazy(() => import("../pages/authPages/Recover"));
const Register = lazy(() => import("../pages/authPages/Register"));

const Dashboard = lazy(() => import("../pages/Admin/dashboardPage/Dashboard"));
import UserPage from "../pages/Admin/userPage/UserPage";

// ********************************

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/news/:type",
        element: (
          <Suspense fallback={<Loading />}>
            <News />
          </Suspense>
        ),
      },
      {
        path: "/sponsor",
        element: (
          <Suspense fallback={<Loading />}>
            <Sponsor />
          </Suspense>
        ),
      },
      {
        path: "/packs",
        element: (
          <Suspense fallback={<Loading />}>
            <Packs />
          </Suspense>
        ),
      },
      {
        path: "/donation",
        element: (
          <Suspense fallback={<Loading />}>
            <Donation />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginLayout>
          <Login />
        </LoginLayout>
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginLayout>
          <Register />
        </LoginLayout>
      </Suspense>
    ),
  },
  {
    path: "forgot",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginLayout>
          <ForgotPassword />
        </LoginLayout>
      </Suspense>
    ),
  },
  {
    path: "recover",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginLayout>
          <Recover />
        </LoginLayout>
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: <MainAdminLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "user",
        element: (
          <Suspense fallback={<Loading />}>
            <UserPage />
          </Suspense>
        ),
      },
    ],
  },
]);

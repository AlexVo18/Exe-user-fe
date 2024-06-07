import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import roles from "../constants/role";
import MainAdminLayout from "../pages/Admin/MainAdminLayout";
import MainLayout from "../pages/Users/MainLayout";
import LoginLayout from "../pages/Users/LoginLayout";
import AdminNewsLayout from "../pages/Admin/newsPage/AdminNewsLayout";

// *** Lazy Routes (Tất cả các route ngoài trừ layout sẽ import vào đây) ***
const Home = lazy(() => import("../pages/Users/homePage/Home"));
const About = lazy(() => import("../pages/Users/aboutPage/About"));
const News = lazy(() => import("../pages/Users/newsPage/News"));
const Sponsor = lazy(() => import("../pages/Users/sponsorPage/Sponsor"));
const Packs = lazy(() => import("../pages/Users/packsPage/Packs"));
const Donation = lazy(() => import("../pages/Users/donationPage/Donation"));
const Error = lazy(() => import("../pages/Users/errorPage/Error"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const TreesView = lazy(() => import("../pages/Users/treePage/TreesView"));

const Login = lazy(() => import("../pages/Users/authPages/Login"));
const ForgotPassword = lazy(
  () => import("../pages/Users/authPages/ForgotPassword")
);
const Recover = lazy(() => import("../pages/Users/authPages/Recover"));
const Register = lazy(() => import("../pages/Users/authPages/Register"));

const Dashboard = lazy(() => import("../pages/Admin/dashboardPage/Dashboard"));
import UserPage from "../pages/Admin/userPage/UserPage";
import Profile from "../pages/Users/profilePage/Profile";
import AdminTransaction from "../pages/Admin/transactionPage/AdminTransaction";

// ********************************

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<></>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<></>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "news/:type",
        element: (
          <Suspense fallback={<></>}>
            <News />
          </Suspense>
        ),
      },
      {
        path: "sponsor",
        element: (
          <Suspense fallback={<></>}>
            <Sponsor />
          </Suspense>
        ),
      },
      {
        path: "packs",
        element: (
          <Suspense fallback={<></>}>
            <Packs />
          </Suspense>
        ),
      },
      {
        path: "user",
        element: (
          <Suspense fallback={<></>}>
            <ProtectedRoute allowedRoles={[roles.NORMAL]} />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            index: true,
            element: (
              <Suspense fallback={<></>}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: "donation",
            element: (
              <Suspense fallback={<></>}>
                <Donation />
              </Suspense>
            ),
          },
          {
            path: "tree",
            element: (
              <Suspense fallback={<></>}>
                <TreesView />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<></>}>
        <LoginLayout>
          <Login />
        </LoginLayout>
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<></>}>
        <LoginLayout>
          <Register />
        </LoginLayout>
      </Suspense>
    ),
  },
  {
    path: "forgot",
    element: (
      <Suspense fallback={<></>}>
        <LoginLayout>
          <ForgotPassword />
        </LoginLayout>
      </Suspense>
    ),
  },
  {
    path: "recover",
    element: (
      <Suspense fallback={<></>}>
        <LoginLayout>
          <Recover />
        </LoginLayout>
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: (
      <MainAdminLayout>
        <Suspense fallback={<></>}>
          <ProtectedRoute allowedRoles={[roles.ADMIN]} />
        </Suspense>
      </MainAdminLayout>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<></>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "user",
        element: (
          <Suspense fallback={<></>}>
            <UserPage />
          </Suspense>
        ),
      },
      {
        path: "transaction",
        element: (
          <Suspense fallback={<></>}>
            <AdminTransaction />
          </Suspense>
        ),
      },
      {
        path: "news",
        element: (
          <Suspense fallback={<></>}>
            <AdminNewsLayout />
          </Suspense>
        ),
      },
    ],
  },
  // Bắt route lỗi
  {
    path: "*",
    element: (
      <Suspense fallback={<></>}>
        <Error />
      </Suspense>
    ),
  },
]);

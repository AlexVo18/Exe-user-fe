import { Route, Routes, createBrowserRouter } from "react-router-dom";
import MainAdminLayout from "../pages/Admin/MainAdminLayout";
import MainLayout from "../pages/Users/MainLayout";
import { Suspense, lazy } from "react";

// *** Lazy Routes (Tất cả các route ngoài trừ main layout sẽ import vào đây) ***
const Home = lazy(() => import("../pages/Users/homePage/Home"));
const Login = lazy(() => import("../pages/Users/loginPage/Login"));
const About = lazy(() => import("../pages/Users/aboutPage/About"));
const News = lazy(() => import("../pages/Users/newsPage/News"));
const Sponsor = lazy(() => import("../pages/Users/sponsorPage/Sponsor"));
const Packs = lazy(() => import("../pages/Users/packsPage/Packs"));
const Donation = lazy(() => import("../pages/Users/donationPage/Donation"));

// ********************************

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<></>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<></>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/news"
            element={
              <Suspense fallback={<></>}>
                <News />
              </Suspense>
            }
          />
          <Route
            path="/sponsor"
            element={
              <Suspense fallback={<></>}>
                <Sponsor />
              </Suspense>
            }
          />
          <Route
            path="/packs"
            element={
              <Suspense fallback={<></>}>
                <Packs />
              </Suspense>
            }
          />
          <Route
            path="/donation"
            element={
              <Suspense fallback={<></>}>
                <Donation />
              </Suspense>
            }
          />
        </Routes>
      </MainLayout>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: (
      <MainAdminLayout>
        <Routes></Routes>
      </MainAdminLayout>
    ),
  },
]);

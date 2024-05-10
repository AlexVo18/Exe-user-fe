import { Route, Routes, createBrowserRouter } from "react-router-dom";
import MainAdminLayout from "../pages/Admin/MainAdminLayout";
import MainLayout from "../pages/Users/MainLayout";
import { Suspense, lazy } from "react";
import About from "../pages/Users/aboutPage/About";

// *** Lazy Routes (Tất cả các route ngoài trừ main layout sẽ import vào đây) ***
const Home = lazy(() => import("../pages/Users/homePage/Home"));
const Login = lazy(() => import("../pages/Users/loginPage/Login"));

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
    element: (<MainAdminLayout>
      <Routes></Routes>
    </MainAdminLayout>),
  },
]);

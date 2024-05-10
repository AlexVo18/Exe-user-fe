import { Route, Routes, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Users/loginPage/Login";
import MainAdminLayout from "../pages/Admin/MainAdminLayout";
import MainLayout from "../pages/Users/MainLayout";

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <MainLayout>
        <Routes>
          <Route />
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
    element: <MainAdminLayout></MainAdminLayout>,
  },
]);

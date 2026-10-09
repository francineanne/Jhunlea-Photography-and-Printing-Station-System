import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { SuperAdminDashboard } from "./pages/super-admin-dashboard";
import { AdminDashboard } from "./pages/admin-dashboard";
import { RootLayout } from "./components/root-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "super-admin",
        Component: SuperAdminDashboard,
      },
      {
        path: "admin",
        Component: AdminDashboard,
      },
    ],
  },
]);
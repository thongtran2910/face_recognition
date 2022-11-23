import LayoutTheme from "../HOC/LayoutTheme";
import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import SignInPage from "../pages/SignInPage/SignInPage";

export const userRoute = [
  {
    path: "/",
    component: <LayoutTheme Component={HomePage} />,
    isUseLayout: true,
  },
  {
    path: "/signin",
    component: <LayoutTheme Component={SignInPage} />,
    isUseLayout: true,
  },
  {
    path: "/register",
    component: <LayoutTheme Component={RegisterPage} />,
    isUseLayout: true,
  },
];

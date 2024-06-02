import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "register",
        element: (
          <AuthLayouts >
            <RegisterPage></RegisterPage>
          </AuthLayouts>
        ),
      },
      {
        path: "email",
        element: (
          <AuthLayouts>
            <CheckEmailPage />
          </AuthLayouts>
        ),
      },
      {
        path: "password",
        element: (
          <AuthLayouts>
            <CheckPasswordPage />
          </AuthLayouts>
        ),
      },
      {
        path: "",
        element: <Home></Home>,
        children: [
          {
            path: ":userId",
            element: <MessagePage></MessagePage>,
          },
        ],
      },
    ],
  },
]);

export default router;

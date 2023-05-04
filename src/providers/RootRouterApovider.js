import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "../App";
import Hello from "../Hello";
import Login from "../Login";
import SignUp from "../SignUp";
import AccountUpdate from "../AccountUpdate";
import PasswordForget from "../PasswordForget";
import PasswordEdit from "../PasswordEdit";

const RootRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      children: [
        {
          index: true,
          element: <Hello/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/sign_up',
          element: <SignUp/>,
        },
        {
          path: '/update_account',
          element: <AccountUpdate/>,
        },
        {
          path: '/password_forget',
          element: <PasswordForget/>,
        },
        {
          path: '/password_edit',
          element: <PasswordEdit/>,
        },
        {
          path: '/hello',
          element: <Hello/>,
        },
      ]
    }
  ]);

  return(
    <RouterProvider router={router} />
  );
}

export default RootRouterProvider;

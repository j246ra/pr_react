import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import App from "../App";
import Hello from "../Hello";
import Login from "../Login";
import SignUp from "../SignUp";
import AccountUpdate from "../AccountUpdate";
import PasswordForget from "../PasswordForget";
import PasswordEdit from "../PasswordEdit";
import {useUser} from "./UserProvider";

const RootRouterProvider = () => {
  const { user, isLogin } = useUser();

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
          loader: async () => {
            if(isLogin()){
              // axiosを使うと永久ループ？
              // 原因はわからないが fetch でリクエストすると問題なくデータが取得できたのでさらなる検証が必要！
              // fetch は axios のラッパーじゃないの？
              // TODO client の見直し
              // TODO リクエストエラー処理
              return await fetch('http://localhost:3000/v1/test', { headers: {
                "access-token": user.token,
                  uid: user.uid,
                  client: user.client
              }});
            }
            return redirect('/login');
          }
        },
      ]
    }
  ]);

  return(
    <RouterProvider router={router} />
  );
}

export default RootRouterProvider;

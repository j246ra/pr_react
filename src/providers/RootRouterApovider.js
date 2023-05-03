import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import App from "../App";
import Hello from "../Hello";
import Login from "../Login";
import SignUp from "../SignUp";
import AccountUpdate from "../AccountUpdate";
import PasswordForget from "../PasswordForget";
import PasswordEdit from "../PasswordEdit";

const RootRouterProvider = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Hello />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/sign_up" element={<SignUp />}/>
        <Route path="/update_account" element={<AccountUpdate />}/>
        <Route path="/password_forget" element={<PasswordForget />}/>
        <Route path="/password_edit" element={<PasswordEdit />}/>
        <Route path="/hello" element={<Hello />}/>
      </Route>
    )
  );

  return(
    <RouterProvider router={router} />
  );
}

export default RootRouterProvider;

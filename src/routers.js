import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AccontContext } from "./components/AccountContext";
import Home from "./pages/home";
import AuthForm from "./pages/authForm";
import PrivateRoute from "./PrivateRoute";
import Layout from "./layout";
import UploadPost from "./pages/uploadPost";
import UserProfile from "./pages/profile";
import EditProfile from "./pages/profile/EditProfile";


const IfLogin = () => {
  return(
    <Navigate to={'/home'} />
  )
}

const Routers = () => {
  const userctx = useContext(AccontContext);
  const storage = JSON.parse(localStorage.getItem('user')); 
  const isAuth = storage ? storage?.loggedIn : null;
  const userData = storage?.user;
  return (
    <Routes>
      <Route path="/" element={ storage ? <IfLogin /> : <AuthForm />} />
      
      <Route element={<PrivateRoute isAuth={isAuth} />}>
          <Route path="/home" element={<Home userData={userData} />} />
          <Route path="/upload" element={<UploadPost userData={userData}/>} /> 
          <Route path="/profile/:id" element={<UserProfile userData={userData} />} /> 
          <Route path="/profile/edit" element={<EditProfile userData={userData} />} /> 
      </Route>
      
      <Route path="*" element={<h1>404 | PAGE NOT FOUND</h1>} />
    </Routes>
  )

};

export default Routers;

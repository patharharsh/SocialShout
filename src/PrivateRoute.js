import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccontContext } from "./components/AccountContext";

// const useAuth = () => {
//     const {user} = useContext(AccontContext)
//     console.log(user);
//     return user && user.loggedIn;
// }


const PrivateRoute = (props) => {
 
    // let isAuth = useAuth();
    // const isAuth = JSON.parse(localStorage.getItem("user"));
    if (props.isAuth) {
        return <Outlet /> 
    } else {
        return <Navigate to="/" /> 
    }
}

export default PrivateRoute;
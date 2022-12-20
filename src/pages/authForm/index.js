import { useState } from "react";
import Login from "../../components/Forms/Login";
import Signup from "../../components/Forms/Signup";
import classes from './authForm.module.css'

const AuthForm = () => {

    const [newUser,setNewUser] = useState(true);

    const newUserHandler = () => {
        setNewUser(!newUser)
    }

  return (
    <>
      <div className="vh-100 w-100 d-flex justify-content-center align-items-center flex-column">
        
        {newUser ? <Login /> : <Signup />}
        <div className="w-25 text-center border border-1 p-4">
          {newUser ? <p className="m-0">Do have an account? <b onClick={newUserHandler} className={classes.switch_user_link}>Sign Up</b></p> : <p className="m-0">Already have an account? <b onClick={newUserHandler} className={classes.switch_user_link}>Login</b></p>}
        </div>
      </div>
    </>
  );
};

export default AuthForm;

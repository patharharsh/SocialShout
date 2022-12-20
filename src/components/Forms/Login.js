import { Formik, Field, Form } from "formik";
import * as yup from "yup";
// import fetch from "isomorphic-unfetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AccontContext } from "../AccountContext";

const Login = () => {
    const navigate = useNavigate();
  const loginHandler = async (data) => {
    const resp = axios
      .post("http://localhost:9000/users/login", data, {
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        localStorage.setItem("user",JSON.stringify(res.data))
      })
      .then(() => {

        navigate('/home');
        // router.replace({
        //   pathname: "/",
        // });
      });
  };

  const FormSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          loginHandler(JSON.stringify(values, null, 4));
        }}
      >
        {({ values, errors, touched }) => (
          <Form className="w-25"> 
            <div>
              <div className="text-center border border-1 p-5 mb-3">
                <div className="logo-area mb-5">
                  <img src="./images/logo.png" alt="logo" />
                </div>
                <div>
                  <div
                    className={
                      touched.username && errors.username ? "invalid " : " "
                    }
                  >
                    <span>
                      {touched.username && errors.username
                        ? errors.username
                        : null}
                    </span>
                    <div className="form-floating mb-3">
                      {/* <input type="email"  /> */}
                      <Field
                        name="username"
                        className="form-control"
                        placeholder="enter your username"
                        type="text"
                        id="InputEmail"
                      />
                      <label htmlFor="InputEmail">Username</label>
                    </div>
                  </div>
                  <div
                    className={
                      touched.password && errors.password ? "invalid " : " "
                    }
                  >
                    <span>
                      {touched.password && errors.password
                        ? errors.password
                        : null}
                    </span>
                    <div className="form-floating mb-3">
                      <Field
                        name="password"
                        type="password"
                        className="form-control"
                        id="InputPassword"
                        placeholder="Password"
                      />
                      <label htmlFor="InputPassword">Password</label>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const signupHandler = async (data) => {
    const resp = axios
      .post("http://localhost:9000/users/SIGNUP", data, {
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
        navigate("/home");
        // router.push({
        //   pathname: "/",
        // });
      });
  };

  const FormSchema = yup.object().shape({
    email: yup.string().required().email(),
    name: yup.string().required(),
    username: yup.string().required(),
    password: yup
      .string()
      .required()
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
          email: "",
          name: "",
          username: "",
          password: "",
        }}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          signupHandler(JSON.stringify(values, null, 4));
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-25">
            <div>
              <div className="text-center border border-1 p-5 mb-3">
                <div className="logo-area mb-5">
                  <img src="./images/logo.png" alt="logo" />
                </div>
                <div>
                  <div
                    className={touched.email && errors.email ? "invalid " : " "}
                  >
                    <span>
                      {touched.email && errors.email ? errors.email : null}
                    </span>
                    <div className="form-floating mb-3">
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                        id="InputEmail"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="InputEmail">Email address</label>
                    </div>
                  </div>
                  <div
                    className={
                      touched.name && errors.name ? "invalid " : " "
                    }
                  >
                    <span>
                      {touched.name && errors.name
                        ? errors.name
                        : null}
                    </span>
                    <div className="form-floating mb-3">
                      <Field
                        name="name"
                        type="text"
                        className="form-control"
                        id="InputName"
                        placeholder="Enter your name"
                      />
                      <label htmlFor="InputName">Full Name</label>
                    </div>
                  </div>
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
                      <Field
                        name="username"
                        type="text"
                        className="form-control"
                        id="InputUserName"
                        placeholder="Enter your user name"
                      />
                      <label htmlFor="InputUserName">Username</label>
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
                      Sign Up
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

export default Signup;

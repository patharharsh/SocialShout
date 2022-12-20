import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Row from "react-bootstrap/esm/Row";
import ImageUploading from "react-images-uploading";
import Layout from "../../../layout";
import classes from "../profile.module.css";
import { MdEdit } from "react-icons/md";
import { Field, Form, Formik } from "formik";
import { AccontContext } from "../../../components/AccountContext";
import axios from "axios";

const EditProfile = (props) => {
  const [images, setImages] = React.useState([]);

  
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/users/id/${props.userData.user_id}`, {
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        const result = res.data;
        setUserData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const EditHandler = (data) => {
    // const data = JSON.parse(values)
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("dpImg", images[0].file);
    const resp = axios.post(
      `http://localhost:9000/users/id/${props.userData.user_id}`,
      formData,
      {
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "multipart/form-data",
        },
      }
    ).catch((err) => {
      console.log(err);
    });
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  const imgPath = (props.userData.dp_path !== null && props.userData.dp_path !== undefined) ? props.userData.dp_path :  "/images/profilepic.jpg";
  return (
    <>
      <Layout userData={props.userData} >
        <Row className="align-items-center ">
          <Col sm={4}>
            <ImageUploading
              multiple={false}
              value={images}
              onChange={onChange}
              dataURLKey="data_url"
              inputProps={{ name: "dpImg"}}
            >
              {({ imageList, onImageUpload }) => (
                // write your building UI
                <>
                  <div className={classes.userdp}>
                    <Image
                      src={
                        imageList.length !== 0
                          ? imageList[0]["data_url"]
                          :  imgPath
                      }
                      alt="ProfilePic"
                      className="w-100"
                      roundedCircle
                    />
                    <button
                      className={classes.dp_edit + " btn-primary btn"}
                      onClick={onImageUpload}
                    >
                      <MdEdit />
                    </button>
                  </div>
                </>
              )}
            </ImageUploading>
          </Col>
          <Col sm={8}>
            <Formik
              initialValues={{
                email: userData?.email,
                name: userData?.name,
                username: userData?.username,
              }}
              enableReinitialize
              // validationSchema={FormSchema}
              onSubmit={(values) => {
                // EditHandler(JSON.stringify(values, null, 4));
                EditHandler(values);
              }}
            >
              {({ values, errors, touched }) => (
                <Form>
                  <div>
                    <div
                      className={
                        touched.email && errors.email ? "invalid " : " "
                      }
                    >
                      <span>
                        {touched.email && errors.email ? errors.email : null}
                      </span>
                      <div className="form-floating mb-3">
                        <Field
                          name="email"
                          type="text"
                          className="form-control"
                          id="InputEmail"
                          placeholder="name@example.com"
                          // values={}
                        />
                        <label htmlFor="InputEmail">Email address</label>
                      </div>
                    </div>
                    <div
                      className={touched.name && errors.name ? "invalid " : " "}
                    >
                      <span>
                        {touched.name && errors.name ? errors.name : null}
                      </span>
                      <div className="form-floating mb-3">
                        <Field
                          name="name"
                          type="text"
                          className="form-control"
                          id="InputName"
                          placeholder="Enter your name"
                          // value={}
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
                          placeholder="username"
                          // value={}
                        />
                        <label htmlFor="InputUserName">Username</label>
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
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default EditProfile;

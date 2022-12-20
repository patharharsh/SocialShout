import { Field, Form, Formik } from "formik";
import { CgAddR } from "react-icons/cg";

import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./uploadPostForm.module.css";
import { useContext } from "react";
import { AccontContext } from "../../AccountContext";

const UploadPostForm = (props) => {

  const userData = props.userData;

  const navigate = useNavigate();
  const uploadHandler = async (data) => {
    data.user_id = userData.user_id;
    const formData = new FormData();
    formData.append("caption", data.caption);
    formData.append("user_id", data.user_id);
    formData.append("postImg", data.postImg);
    const resp = axios
      .post("http://localhost:9000/posts/upload", formData, {
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate('/home');
        // router.push({
        //   pathname: "/user/feed",
        // });
      });
  };

  const FormSchema = yup.object().shape({});

  return (
    <>
      <Formik
        initialValues={{
          postImg: "",
          caption: "",
        }}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          uploadHandler(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div className={classes.upload_area}>
              <span>
                {touched.postImg && errors.postImg ? errors.postImg : null}
              </span>
              <input
                name="postImg"
                type="file"
                className={classes.upload_input}
                id="InputPost"
                placeholder="Upload Post"
                onChange={(event) => {
                  setFieldValue("postImg", event.target.files[0]);
                }}
              />
              <label
                htmlFor="InputPost"
                className={classes.upload_field}
                id="file-label"
              >
                <div className={classes.file_thumbnail}>
                  <img
                    id="image-preview"
                    src="https://www.btklsby.go.id/images/placeholder/basic.png"
                    alt=""
                  />
                  <h4>
                    <CgAddR />
                  </h4>
                  <h3 id="filename">Uplaod Post</h3>
                  <p>Supports JPG, PNG, SVG</p>
                </div>
              </label>
            </div>
            <div className="form-floating my-3">
              <Field
                name="caption"
                as="textarea"
                className="form-control"
                id="InputCaption"
                placeholder="Caption"
                rows="3"
              />
              <label htmlFor="InputCaption">Caption</label>
            </div>
            <div>
              <button type="submit">submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UploadPostForm;
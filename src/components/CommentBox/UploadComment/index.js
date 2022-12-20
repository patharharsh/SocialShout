import axios from "axios";
import { Field, Form, Formik } from "formik";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import { TbSend } from "react-icons/tb";
import classes from "../comment.module.css";

const UploadCommet = (props) => {

  const addCommentHandler = (data) =>{
    const submitData = {
      "user_id" : props.uid,
    "post_id" : props.post_id,
    ...data
    }

     axios
      .post("http://localhost:9000/comments/", submitData, {
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        props.onPost()
        // navigate('/home');
        // router.push({
        //   pathname: "/user/feed",
        // });
      }).catch((err) => console.log(err))
      ;
  }

  return (
    <>
      <div className="d-flex my-2">
        <div className={classes.dp_area}>
          <Image
            src={"/images/profilepic.jpg"}
            alt="ProfilePic"
            className="w-100"
          />
        </div>
        <div className="w-100">
          <Formik
            initialValues={{
              content: ""
            }}
            onSubmit={(values) => {
              addCommentHandler(values)
            }}
          >
            {() => (
              <Form className={classes.input_box}>
                <Field
                  name="content"
                  as="textarea"
                  className={classes.comment_input + " form-control"}
                  id="InputCaption"
                  placeholder="Add Comment"
                  rows="1"
                />
                <Button type="submit" className={classes.comment_btn}>POST</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UploadCommet;

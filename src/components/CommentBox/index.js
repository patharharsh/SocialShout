import Comment from "./comment";
import classes from "./comment.module.css";
import UploadCommet from "./UploadComment";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function CommentBox(props) {
  const [comment , setComment] = useState([]);
  const numberOfCmnt = props.add ? 3 : comment.length;
  
  useEffect(() => {
    axios
      .get(`http://localhost:9000/comments/post/${props.post_id}`, {
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        if (!res || res.status >= 400) {
          return;
        }
        const data = res.data;
        setComment(data);
        return;
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  },[props.show])

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className={classes.comment_header}>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comment?.slice(0, numberOfCmnt).map((i) => (
          <Comment user_id={i.user_id} content={i.content} key={i.cmnt_id} />
          ))}

          {props.add && <UploadCommet onPost={props.handleClose} uid={props.uid}  post_id={props.post_id} />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CommentBox;

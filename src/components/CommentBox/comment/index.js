import axios from "axios";
import { useEffect, useState } from "react";
import Image from "react-bootstrap/esm/Image";
import classes from "../comment.module.css";

const Comment = (props) => {

  const [userData , setUserData] = useState()

  useEffect(() => {
    axios
    .get(`http://localhost:9000/users/id/${props.user_id}`, {
      withCredentials: true, // should be there
      credentials: "include", // should be there
    })
    .then((res) => {
      if (!res || res.status >= 400) {
        return;
      }
      const data = res.data;
      setUserData(data);
      return;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
  },[])

  return (
    <>
      <div className="d-flex my-2">
        <div className={classes.dp_area}>
          <Image
            src={userData?.dp_path !== null ? userData?.dp_path : "/images/profilepic.jpg"}
            alt="ProfilePic"
            className="w-100"
            roundedCircle
          />
        </div>
        <div>
          <div className={classes.username}>{userData?.username}</div>
          <div className={classes.content}>
            {props.content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;

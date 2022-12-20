import { BiDotsVerticalRounded, BiBookmark } from "react-icons/bi";
import { BsChat, BsHeart, BsHeartFill } from "react-icons/bs";
import { IoChatboxEllipsesSharp, IoPaperPlaneOutline } from "react-icons/io5";
import classes from "./postcard.module.css";
import Image from "react-bootstrap/Image";
import Time from "../../Time";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentBox from "../../CommentBox";

const PostCard = (props) => {
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
     setShow(true);
     setShowAdd(false);
  };
  const handleShowbtn = () => {
    setShow(true);
    setShowAdd(true);
  };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(null);

  const [postUser, setPostUser] = useState("null");
  const likeApi = `http://localhost:9000/posts/likes/${props.post_id}/${props.uid}`;
  const postUserApi = `http://localhost:9000/users/id/${props.post_uid}`;
  useEffect(() => {
    const likeCount = `http://localhost:9000/posts/likes/${props.post_id}`;

    axios
      .get(postUserApi, {
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        setPostUser(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(likeCount, {
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setLikeCount(data.result);
      })
      .catch((err) => console.log(err));
  }, [postUserApi, liked]);

  useEffect(() => {
    axios
      .get(likeApi, {
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        const result = res.data.result;
        if (result === "true") {
          setLiked(true);
        } else if (result === "false") {
          setLiked(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const likeHandler = () => {
    if (liked) {
      axios
        .delete(likeApi, {
          withCredentials: true, // should be there
          credentials: "include", // should be there
        })
        .then((res) => {
          // setLikeCount(likeCount - 1);
          setLiked(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(likeApi, {
          withCredentials: true, // should be there
          credentials: "include", // should be there
        })
        .then((res) => {
          // setLikeCount(likeCount + 1);
        })
        .catch((err) => console.log(err));
      setLiked(true);
    }
  };

  return (
    <div className="border border-1 mt-3" id={props.post_id}>
      <div className="d-flex justify-content-between px-3 py-2 align-items-center">
        <div className="d-flex align-items-center">
          <div
            className={classes.postcard_dp + " rounded-circle overflow-hidden"}
          >
            <img
              src={
                postUser.dp_path !== null
                  ? postUser.dp_path
                  : "/images/profilepic.jpg"
              }
              alt="ProfilePic"
              className="w-100"
            />
          </div>
          <Link to={"/profile/" + props.post_uid} className={classes.username}>
            {postUser.username}
          </Link>
        </div>
        <div>
          <BiDotsVerticalRounded />
        </div>
      </div>
      <div>
        <Image src={props.img_path} className="w-100" />
      </div>
      <div className="px-3 py-2">
        <div
          className={classes.postcard_icons + " d-flex justify-content-between"}
        >
          <ul>
            <li onClick={likeHandler}>
              {liked ? <BsHeartFill className={classes.liked} /> : <BsHeart />}
            </li>
            <li onClick={handleShowbtn}>
              <BsChat />
            </li>
            <li>
              <IoPaperPlaneOutline />
            </li>
          </ul>
          <div>
            <BiBookmark />
          </div>
        </div>
        <div className={classes.like_counts}>{likeCount} likes</div>
        <div className={classes.caption_area}>{props.caption}</div>
        <CommentBox
          show={show}
          handleClose={handleClose}
          header={props.caption}
          post_id={props.post_id}
          add={showAdd}
          uid={props.uid}
        />
        <div className={classes.comment_link} onClick={handleShow} >view all comments</div>
        <div className={classes.post_time}>
          <Time time={props.created_on} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Layout from "../../layout";
import classes from "./profile.module.css";
import Button from "react-bootstrap/esm/Button";
import { AccontContext } from "../../components/AccountContext";
import Posts from "../../components/Posts";

const UserProfile = (props) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState([]);
  const [unfollow, setUnfollow] = useState(false);
  const params = useParams();
  const data = {
    uid: props.userData.user_id,
    target_uid: params.id,
  };
  useEffect(() => {
    axios
      .get(`http://localhost:9000/users/id/${params.id}`, {
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        const result = res.data;
        setUserData(result);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:9000/posts/profile/${params.id}`, {
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        const result = res.data;
        setPostData(result);
      })
      .catch((err) => console.log(err));

      axios
      .post("http://localhost:9000/users/follow", data, {
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        const result = res.data;
                setUnfollow(result.message)
      })
      .catch((err) => console.log(err));


  }, [unfollow , params.id]);

  const followHandler = () => {
    
    axios
      .put("http://localhost:9000/users/follow", data, {
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        const result = res.data.message;
        if (result === "success") {
          setUnfollow(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const unfollowHandler = () => {
    const data = {
      uid: props.userData.user_id,
      target_uid: params.id,
    };
    axios
      .put("http://localhost:9000/users/unfollow", data, {
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        const result = res.data.message;
        if (result === "success") {
          setUnfollow(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const editProfilehandler = () => {
    navigate('/profile/edit')
  }

  return (
    <>
      <Layout userData={props.userData}>
        <div>
          <Row className="align-items-center">
            <Col sm={4}>
              <div className={classes.userdp}>
                <Image
                  src={userData?.dp_path !== null ? userData?.dp_path : "/images/profilepic.jpg"}
                  alt="ProfilePic"
                  className="w-100"
                  roundedCircle
                />
              </div>
            </Col>
            <Col sm={8}>
              <div>
                <Row>
                  <Col xs={12}>
                    <div className={classes.username}>{userData?.username}</div>
                  </Col>
                  <Col xs={12}>
                    <div className={classes.subusername}>{userData?.name}</div>
                  </Col>
                  <Col className="text-center">
                    <div className={classes.profileConter}>
                      <span>{postData.length}</span>Posts
                    </div>
                  </Col>
                  <Col className="text-center">
                    <div className={classes.profileConter}>
                      <span>{userData?.follower.length}</span>
                      Followers
                    </div>
                  </Col>
                  <Col className="text-center">
                    <div className={classes.profileConter}>
                      <span>{userData?.following.length}</span>Following
                    </div>
                  </Col>
                  <Col xs={12}>
                    {props.userData.user_id == userData?.user_id ? (
                      <Button className={classes.edit_btn + " w-100"} onClick={editProfilehandler} >
                        Edit Profile
                      </Button>
                    ) : (
                      <Button
                        onClick={!unfollow ? followHandler : unfollowHandler}
                        className="w-100"
                      >
                        {!unfollow ? "follow" : "unfollow"}
                      </Button>
                    )}
                    {/* <Button className="w-100">Follow</Button> */}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <hr />
          <Posts postData={postData} type={"grid"} />
        </div>
      </Layout>
    </>
  );
};

export default UserProfile;

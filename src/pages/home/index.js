import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AccontContext } from "../../components/AccountContext";
import Posts from "../../components/Posts";
import StoryArea from "../../components/storyArea";
import Layout from "../../layout";



const Home = (props) => {
  const [post, setPost] = useState([]);
 

  useEffect(() => {
    axios
      .get(`http://localhost:9000/posts/${props.userData.user_id}`, {
        withCredentials: true, // should be there
        credentials: "include", // should be there
      })
      .then((res) => {
        if (!res || res.status >= 400) {
          return;
        }
        const data = res.data;
        setPost(data);
        return;
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }, []);

  return (
    <>
    <Layout userData={props.userData}  >
      <StoryArea />
      <Posts postData={post} type={"list"}  userData={props.userData} />
    </Layout>
    </>
  );
};

export default Home;

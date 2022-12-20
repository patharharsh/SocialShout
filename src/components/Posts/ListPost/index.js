import { useContext } from "react";
import { AccontContext } from "../../AccountContext";
import PostCard from "../postCard";

const ListPost = (props) => {
    return (
        <>
      {props.postData.map((i) => (
        <PostCard
          key={i.post_id}
          post_id={i.post_id}
          post_uid={i.user_id}
          img_path={i.img_path}
          likes={i.likes}
          caption={i.caption}
          created_on={i.created_on}
          uid={props.userData?.user_id}
          commentsCount={i.comments}
        />
      ))}
    </>
    )
}

export default ListPost;
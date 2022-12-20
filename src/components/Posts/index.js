import { useState } from "react";
import GridPost from "./GridPost";
import ListPost from "./ListPost";

const Posts = (props) => {

  const [layoutType , setLayoutType] = useState(props.type);

  const gridToListHandler = () => {
    setLayoutType("list")
  }



  switch (layoutType) {
    case "list":
      return (
        <>
          <ListPost postData={props.postData} userData={props.userData} />
        </>
      )
      break;
    case "grid":
      return (
        <>
          <GridPost postData={props.postData} clickHandler={gridToListHandler} />
        </>
      )
      break;

    default:
      return (
        <>
          <ListPost postData={props.postData} userCtx={props.userCtx} />
        </>
      )
      break;
  }
};

export default Posts;

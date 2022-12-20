import classes from "./gridpost.module.css";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Row from "react-bootstrap/esm/Row";

const GridPost = (props) => {
  return (
    <Row className="g-0">
      {props.postData.map((post) => (
        <Col xs={4} key={post.id}>
          <div className={classes.post_thumb} onClick={props.clickHandler}>
            <Image src={post.img_path} alt="ProfilePic" />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default GridPost;

import classes from "./searchbox.module.css"
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";

const ResultBox = (props) => {
    return(
        <>
        <div className={classes.result_box}>
            <ul>
              {props.data.map((i) => (
                <li key={i.user_id}>
                  <Link to={"/profile/" + i.user_id}>
                    <Row className="justify-content-center align-items-center g-0">
                      <Col xs={2}>
                        <div className={classes.dp}>
                          <Image
                            src={
                              i.dp_path !== null
                                ? i.dp_path
                                : "/images/profilepic.jpg"
                            }
                            alt="ProfilePic"
                            className="w-100"
                            roundedCircle
                          />
                        </div>
                      </Col>
                      <Col xs={9}>{i.username}</Col>
                    </Row>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
    )
}

export default ResultBox;
import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import classes from "./searchbox.module.css";
import ResultBox from "./ResultBox";

const SearchBox = () => {
  const [searchResult, setSearchResult] = useState([]);
  

  const searchHandler = async (event) => {
    if ( event.target.value.length >= 1) {
      await axios
        .get(`http://localhost:9000/users/search/${event.target.value}`, {
          withCredentials: true, // should be there
          credentials: "include", // should be there
        })
        .then((resp) => {
          setSearchResult(resp.data.data);
        })
        .catch((error) => {
          return;
        });
    }
    if (event.target.value.length < 2 ) {
        setSearchResult([]);
    }

  };

  return (
    <>
      <div className={classes.main_box + " d-flex mx-auto"}>
        <Form>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={searchHandler}
            // onFocus={setResultBox(true)}
            // onBlur={setResultBox(false)}
          />
        </Form>

        {searchResult.length !== 0 && <ResultBox data={searchResult} />}

      </div>
    </>
  );
};

export default SearchBox;

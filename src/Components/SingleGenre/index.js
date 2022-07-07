//import packages
import { Link } from "react-router-dom";

import { Col } from "react-bootstrap";

//import styling
import "./style.css";

const SingleGenre = (props) => {
  const { genreId, genreName } = props;

  return (
    <Col sm={4}>
      <div className="single-genre">
        <Link to={`/genre/${genreName}/${genreId}/movies`}>
          <div className="genre-card">
            <h1>{genreName}</h1>
          </div>
        </Link>
      </div>
    </Col>
  );
};

export default SingleGenre;

//import packages
import { Link } from "react-router-dom";
import { Col, Image } from "react-bootstrap";

//import styling
import "./style.css";

const SingleMovie = (props) => {
  const { movieId, image, title } = props;

  return (
    <Col xs={3}>
      <div className="Single-movie">
        <Link to={`/movies/${movieId}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt={title}
            className="movie-image"
            fluid
          />
        </Link>
      </div>
    </Col>
  );
};

export default SingleMovie;

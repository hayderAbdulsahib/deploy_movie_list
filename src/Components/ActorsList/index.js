//import packages
import { Col } from "react-bootstrap";

//import styling
import "./style.css";

//import image
import noImage from "../../Assets/no-image-available.png";

const ActorsList = (props) => {
  const { image, name, character } = props;

  return (
    <Col xs={4}>
      <div className="single-actor">
        <div className="single-actor-card">
          {image ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${image}`}
              alt={name}
              className="actor-image"
            />
          ) : (
            <img src={noImage} alt={name} className="image-not-found" />
          )}
          <p className="actor-name">{name}</p>
          <p className="actor-role">{character}</p>
        </div>
      </div>
    </Col>
  );
};

export default ActorsList;

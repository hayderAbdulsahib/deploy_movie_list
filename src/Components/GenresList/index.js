//import packages
import axios from "axios";
import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import { Container, Row } from "react-bootstrap";

//import component
import SingleGenre from "../SingleGenre";

//import styling
import "./style.css";

const GenresList = () => {
  const [genres, setGenres] = useState([]);

  const getAllGenresFunc = async () => {
    try {
      const allGenres = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US"
      );

      setGenres(allGenres.data.genres);
    } catch (err) {
      throw err;
    }
  };

  let genresList = [];

  if (genres?.length) {
    genresList = genres.map((element) => {
      return (
        <SingleGenre
          key={element.id}
          genreId={element.id}
          genreName={element.name}
        />
      );
    });
  }

  useEffect(() => {
    getAllGenresFunc();
  }, []);

  return (
    <>
      {genresList.length ? (
        <div className="genres-list">
          <div className="genres-list-container">
            <div className="genres-list-flex">
              <p>Movies Genres</p>
              <Container fluid>
                <Row className="justify-content-md-center">{genresList}</Row>
              </Container>
            </div>
          </div>
        </div>
      ) : (
        <div className="genre-list-center-loader">
          <MoonLoader color={"black"} />
        </div>
      )}
    </>
  );
};

export default GenresList;

//import packages
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";

import { Container, Row, Button } from "react-bootstrap";

//import component
import SingleMovie from "../SingleMovie";

//import styling
import "./style.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [firstMovies, setFirstMovies] = useState({});

  const [pagination, setPagination] = useState(1);
  const [button, setButton] = useState(true);

  const { genreId } = useParams();
  const { genreName } = useParams();

  const getAllMoviesFunc = async () => {
    try {
      const allMovies = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`
      );

      setMovies(allMovies.data.results);
      setFirstMovies(allMovies.data.results[0]);

      console.log(allMovies.data.results[0]);
    } catch (err) {
      throw err;
    }
  };

  const getOtherMovies = async (pageNumber) => {
    setButton(false);

    try {
      const newPage = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${genreId}&with_watch_monetization_types=flatrate`
      );

      const oldPages = movies.slice();

      oldPages.push(...newPage.data.results);

      if (newPage) {
        setMovies(oldPages);
        setButton(true);
      }
    } catch (err) {
      throw err;
    }
  };

  let moviesList;
  if (movies?.length) {
    moviesList = movies.map((element) => {
      return (
        <SingleMovie
          key={element.id}
          movieId={element.id}
          image={element.poster_path}
          title={element.original_title}
        />
      );
    });
  }

  useEffect(() => {
    getAllMoviesFunc();
  }, []);

  return (
    <>
      {moviesList?.length ? (
        <>
          <div className="movie-list">
            <div
              className="movie-first-background-img"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${firstMovies.backdrop_path})`,
              }}
            >
              <div className="background-img-info">
                <h1>{firstMovies.original_title}</h1>
                <p>{firstMovies.overview}</p>
              </div>
            </div>

            <Container>
              <Row className="justify-content-md-center">
                <h2>Popular {genreName} Movies</h2>

                {moviesList}
              </Row>
            </Container>

            {button ? (
              <div className="loading-flex">
                <Button
                  className="load-more-btn"
                  onClick={() => {
                    setPagination(pagination + 1);
                    getOtherMovies(pagination + 1);
                  }}
                >
                  Load More
                </Button>
              </div>
            ) : (
              <div className="movie-pagination-center-loader">
                <MoonLoader color={"black"} size={40} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="movie-list-center-loader">
          <MoonLoader color={"black"} />
        </div>
      )}
    </>
  );
};

export default MovieList;

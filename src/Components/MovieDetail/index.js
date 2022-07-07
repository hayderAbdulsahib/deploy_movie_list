//import packages
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";

import {
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineMonetizationOn,
} from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Modal, Button, Container, Row } from "react-bootstrap";

//import component
import ActorsList from "../ActorsList";

// import the context which we created in the authContext.js using the Context hook
import { BadgeContext } from "../../Contexts/BadgeFavContext";

//import styling
import "./style.css";

export const MovieDetail = () => {
  //we can use destructuring to get the state from the context hook
  // assign the context value to a variable so it can be used (we get this context value from the useContext hook)
  const { setBadge } = useContext(BadgeContext);

  const { movieId } = useParams();

  const [movie, setMovie] = useState({});
  const [castMember, setCastMember] = useState([]);
  const [movieDirector, setMovieDirector] = useState("");

  const [renderPage, setRenderPage] = useState(false);

  //the add to favorite modal state and functions
  const [addToFavModal, setAddToFavModal] = useState(false);
  const handleCloseAddModal = () => setAddToFavModal(false);
  const handleShowAddModal = () => setAddToFavModal(true);

  //the remove from favorite modal state and functions
  const [removeFromFavModal, setRemoveFromFavModal] = useState(false);
  const handleCloseRemoveModal = () => setRemoveFromFavModal(false);
  const handleShowRemoveModal = () => setRemoveFromFavModal(true);

  const getMovieDetailFunc = async () => {
    try {
      const movieData = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US`
      );

      setMovie(movieData.data);
    } catch (err) {
      throw err;
    }
  };

  const getMovieCast = async () => {
    try {
      const fetchCastMembers = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US`
      );

      const allCastMembers = fetchCastMembers.data.cast;

      const actors = allCastMembers.filter((element) => {
        return element.known_for_department === "Acting";
      });

      setCastMember(actors);

      const director = fetchCastMembers.data.crew.find((element) => {
        return element.known_for_department === "Directing";
      });

      setMovieDirector(director.original_name);
    } catch (err) {
      throw err;
    }
  };

  const favoritesMoviesInLocal = JSON.parse(localStorage.getItem("movieList"));

  const time = new Date(0, 0, 0, 0, movie.runtime, 0, 0).toString();

  const hours = time.slice(17, 18) + "h";

  const minutes = time.slice(19, 21) + "m";

  const addMovieToFavorites = () => {
    const movieObj = {
      id: movieId,
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };

    if (!favoritesMoviesInLocal) {
      const movieArr = [movieObj];
      localStorage.setItem("movieList", JSON.stringify(movieArr));
      setBadge(movieArr.length); //we add this in order to change the value of the badge in the navbar
    } else {
      const moviesArrFromLocal = favoritesMoviesInLocal;

      moviesArrFromLocal.push(movieObj);

      localStorage.setItem("movieList", JSON.stringify(moviesArrFromLocal));

      setBadge(moviesArrFromLocal.length); //we add this in order to change the value of the badge in the navbar
    }
  };

  const removeMovieFromFavorites = () => {
    const newFavMoviesArr = favoritesMoviesInLocal.filter((element) => {
      return element.id !== movieId;
    });

    localStorage.setItem("movieList", JSON.stringify(newFavMoviesArr));

    setBadge(newFavMoviesArr.length); //we add this in order to change the value of the badge in the navbar
  };

  let inFavorites = false;

  favoritesMoviesInLocal?.forEach((element) => {
    if (element.id === movieId) {
      inFavorites = true;
    } else {
      inFavorites = false;
    }
  });

  let actorsList;
  if (castMember?.length) {
    actorsList = castMember.map((element, index) => {
      return (
        <ActorsList
          key={index}
          image={element.profile_path}
          name={element.name}
          character={element.character}
        />
      );
    });
  }

  useEffect(() => {
    getMovieDetailFunc();
    getMovieCast();
  }, []);

  return (
    <>
      {movie?.poster_path ? (
        <>
          <div className="movie-detail">
            <div className="main-title-background">
              <div className="main-title">
                <p>
                  <Link to="/">Home</Link> | {movie.original_title}
                </p>
              </div>
            </div>
            <div>
              <div
                className="movie-card-background-img"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                }}
              >
                <div className="center-movie-card">
                  <div>
                    <div className="movie-card">
                      <div>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.original_title}
                        />
                      </div>

                      <div className="movie-main-info">
                        <h2>{movie.original_title}</h2>

                        <p className="movie-plot-title">PLOT</p>
                        <p>{movie.overview}</p>

                        <div className="movie-popularity-info">
                          <div>
                            <h3>RATING</h3>
                            <h3 className="movie-rating">
                              {movie.vote_average}
                            </h3>
                          </div>

                          <div className="movie-director">
                            <h3>DIRECTOR</h3>
                            <h3>{movieDirector}</h3>
                          </div>

                          {inFavorites ? (
                            <MdFavorite
                              onClick={() => {
                                handleShowRemoveModal();
                              }}
                              className="remove-fav-icon"
                            />
                          ) : (
                            <MdFavoriteBorder
                              onClick={() => {
                                handleShowAddModal();
                              }}
                              className="add-fav-icon"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="movie-extra-info-container">
                <div className="movie-extra-info">
                  <div className="movie-extra-single-flex">
                    <BiTime className="movie-extra-icons" />
                    <p> Running time: {hours + " " + minutes}</p>
                  </div>

                  <div className="movie-extra-single-flex">
                    <FaRegMoneyBillAlt className="movie-extra-icons" />
                    <p>Budget: ${movie.budget?.toLocaleString()}</p>
                  </div>

                  <div className="movie-extra-single-flex">
                    <MdOutlineMonetizationOn className="movie-extra-icons" />
                    <p>Revenue: ${movie.revenue?.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="actor-list">
                <div>
                  <Container>
                    <Row className="justify-content-md-center">
                      <h2>Actors</h2>

                      {actorsList}
                    </Row>
                  </Container>
                </div>
              </div>
            </div>
          </div>

          {/* the add to Favorites Modal */}
          <Modal show={addToFavModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add to Favorite</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to add this movie to favorite list ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseAddModal();
                  addMovieToFavorites();
                  setRenderPage(!renderPage);
                }}
              >
                Add Movie
              </Button>
            </Modal.Footer>
          </Modal>

          {/* the remove from Favorites Modal */}
          <Modal show={removeFromFavModal} onHide={handleCloseRemoveModal}>
            <Modal.Header closeButton>
              <Modal.Title>Remove From Favorite</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to remove this movie from favorite list ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseRemoveModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseRemoveModal();
                  removeMovieFromFavorites();
                  setRenderPage(!renderPage);
                }}
              >
                Remove Movie
              </Button>
            </Modal.Footer>
          </Modal>
          {/* </div> */}
        </>
      ) : (
        <div className="movie-detail-center-loader">
          <MoonLoader color={"black"} />
        </div>
      )}
    </>
  );
};

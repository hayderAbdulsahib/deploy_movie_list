//import packages
import { useState, useContext } from "react";

import { Modal, Button } from "react-bootstrap";

// import the context which we created in the authContext.js using the Context hook
import { BadgeContext } from "../../Contexts/BadgeFavContext";

//import styling
import "./style.css";

const FavoritesList = () => {
  //we can use destructuring to get the state from the context hook
  // assign the context value to a variable so it can be used (we get this context value from the useContext hook)
  const { setBadge } = useContext(BadgeContext);

  const [movieList, setMovieList] = useState(
    JSON.parse(localStorage.getItem("movieList"))
  );

  const [movieId, setMovieId] = useState(0);

  //the remove from favorite modal state and functions
  const [removeFromFavModal, setRemoveFromFavModal] = useState(false);
  const handleCloseRemoveModal = () => setRemoveFromFavModal(false);
  const handleShowRemoveModal = () => setRemoveFromFavModal(true);

  const removeFromFavFunc = (id) => {
    const newFavArr = movieList.filter((element) => {
      return element.id !== id;
    });

    setMovieList(newFavArr);

    localStorage.setItem("movieList", JSON.stringify(newFavArr));

    setBadge(newFavArr.length);
  };

  return (
    <>
      {movieList?.length ? (
        <>
          {movieList.map((element, index) => {
            return (
              <div key={index}>
                <img src={element.image} alt="Favorite Image" />
                <button
                  onClick={() => {
                    setMovieId(element.id);
                    handleShowRemoveModal();
                  }}
                >
                  remove from favorites
                </button>
              </div>
            );
          })}

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
                  removeFromFavFunc(movieId);
                }}
              >
                Remove Movie
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>there is no favorites</p>
      )}
    </>
  );
};

export default FavoritesList;

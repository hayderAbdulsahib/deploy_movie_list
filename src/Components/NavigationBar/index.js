//import packages
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useContext } from "react";

import { RiMovie2Fill } from "react-icons/ri";

// import the context which we created in the authContext.js using the Context hook
import { BadgeContext } from "../../Contexts/BadgeFavContext";

//import styling
import "./style.css";

export const NavigationBar = () => {
  //   we can use the states that are send using the useContext by either calling it property from the object or by using destructuring
  //   const setIsLoggedIn = useContext(TokenContext).setIsLoggedIn;
  //   const setToken = useContext(TokenContext).setToken;

  //or we can use destructuring to get the state from the context hook
  // assign the context value to a variable so it can be used (we get this context value from the useContext hook)
  const { badge } = useContext(BadgeContext);

  return (
    <>
      <Navbar className="navbar" bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <RiMovie2Fill className="logo-icon" /> Cinerama
            </Navbar.Brand>
          </Link>

          <Link to="/favorites">
            <Navbar.Brand>Favorites {badge}</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </>
  );
};

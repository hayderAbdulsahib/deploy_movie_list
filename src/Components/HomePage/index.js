//import component
import { useState } from "react";
import GenresList from "../GenresList";
import SearchComponent from "../SearchComponent";

import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";

//import css
import "./style.css";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [searchRating, setSearchRating] = useState("");

  return (
    <>
      <div className="home-page">
        <div className="search-container">
          <div className="search-navbar">
            <div className="search-input-flex">
              <FaSearch className="search-icon" />
              <input
                type={"text"}
                placeholder="Search Movie"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearchRating("");
                }}
                className="input-search"
              />
            </div>

            <div className="drop-down-search-container">
              <select
                onChange={(e) => {
                  setSearchRating(e.target.value);
                  setSearch("");
                }}
                className="drop-down-search"
              >
                <option value="">Select Movie By Rating</option>
                <option value="8">Very good 10 - 8 stars</option>
                <option value="6">Good 8 - 6 stars</option>
                <option value="4">Average 6 - 4 stars</option>
                <option value="2">Bad 4 - 2 stars</option>
                <option value="0.1">VeryBad 2 - 0 stars</option>
              </select>
            </div>
          </div>
        </div>

        {search || searchRating ? (
          // <div className="search-component">
          <SearchComponent query={search} ratingQuery={searchRating} />
        ) : (
          // </div>
          <GenresList />
        )}
      </div>
    </>
  );
};

export default HomePage;

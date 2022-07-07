//import packages
import axios from "axios";
import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

import { Container, Row } from "react-bootstrap";

//import component
import SingleMovie from "../SingleMovie";

//import styling
import "./style.css";

const SearchComponent = (props) => {
  const { query, ratingQuery } = props;

  const [resultList, setResultList] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getSearchedResultByTitleFunc = async () => {
    try {
      const allResult = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&query=${query}&page=1&include_adult=false`
      );

      setResultList(allResult.data.results);
    } catch (err) {
      throw err;
    }
  };

  //getting the greaterThan and lessThan values for the rating api
  const greaterThanThisRate = +ratingQuery; //turn it from string to number

  let lessOrEqualThanThisRate;

  if (greaterThanThisRate === 8) {
    lessOrEqualThanThisRate = 10;
  } else if (greaterThanThisRate === 0.1) {
    lessOrEqualThanThisRate = 1.9;
  } else {
    lessOrEqualThanThisRate = Number(ratingQuery) + 1.9;
  }

  //the first page for the rating
  const getSearchedResultByRatingFunc = async () => {
    try {
      const allResult = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=${greaterThanThisRate}&vote_average.lte=${lessOrEqualThanThisRate}&with_watch_monetization_types=flatrate`
      );

      setResultList(allResult.data.results);
    } catch (err) {
      throw err;
    }
  };

  const getOtherMovies = async (pageNumber) => {
    setIsLoading(true);

    try {
      let newPage;

      if (ratingQuery) {
        newPage = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&vote_average.gte=${greaterThanThisRate}&vote_average.lte=${lessOrEqualThanThisRate}&with_watch_monetization_types=flatrate`
        );
      } else {
        newPage = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
        );
      }

      const oldPages = resultList.slice();

      oldPages.push(...newPage.data.results);

      if (newPage) {
        setResultList(oldPages);
        setIsLoading(false);
      }
    } catch (err) {
      throw err;
    }
  };

  let searchedResultList;

  if (resultList?.length) {
    searchedResultList = resultList.map((element) => {
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
    if (query) {
      getSearchedResultByTitleFunc();
    }
    if (ratingQuery) {
      getSearchedResultByRatingFunc();
    }
  }, [query, ratingQuery]);

  return (
    <>
      {searchedResultList?.length ? (
        <>
          <div className="search-component">
            <Container>
              <Row>{searchedResultList}</Row>
            </Container>

            {isLoading ? (
              <div className="search-center-loader">
                <MoonLoader color={"black"} size={40} />
              </div>
            ) : (
              <div className="loading-flex">
                <button
                  className="load-more-search-btn"
                  onClick={() => {
                    setPagination(pagination + 1);
                    getOtherMovies(pagination + 1);
                  }}
                >
                  load more
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>search for something else</p>
      )}
    </>
  );
};

export default SearchComponent;

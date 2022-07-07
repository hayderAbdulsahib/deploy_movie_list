import React, { useState, useEffect } from "react";

export const BadgeContext = React.createContext();

// =================================================================

const BadgeProvider = (props) => {
  const [badge, setBadge] = useState(0);

  useEffect(() => {
    const favMoviesInLocal = JSON.parse(localStorage.getItem("movieList"));

    if (favMoviesInLocal) {
      setBadge(favMoviesInLocal.length);
    }
  }, [badge]);

  // =================================================================

  const state = {
    badge,
    setBadge,
  };
  // =================================================================

  return (
    <BadgeContext.Provider value={state}>
      {props.children}
    </BadgeContext.Provider>
  );
};

export default BadgeProvider;

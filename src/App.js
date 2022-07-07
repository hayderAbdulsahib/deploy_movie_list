//import styling
import "./App.css";

//import packages
import { Route, Routes } from "react-router-dom";

//import components
import HomePage from "./Components/HomePage";
import { NavigationBar } from "./Components/NavigationBar";
import { MovieDetail } from "./Components/MovieDetail";
import FavoritesList from "./Components/FavoritesList";
import MovieList from "./Components/MovieList";

function App() {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/favorites" element={<FavoritesList />} />

        <Route path="/movies/:movieId" element={<MovieDetail />} />

        <Route
          path="/genre/:genreName/:genreId/movies"
          element={<MovieList />}
        />

        <Route path="/" element={<HomePage />} />

        <Route path="/movies" element={<HomePage />} />

        <Route path="*" element={<h1>Page Not found</h1>} />
      </Routes>
    </>
  );
}

export default App;

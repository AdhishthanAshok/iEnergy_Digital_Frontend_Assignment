import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";

const API_URL = `https://www.omdbapi.com?apikey=${import.meta.env.VITE_APP_OMDB_API_KEY}`;


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Marvel");
  }, []);

  return (
    <Router>
      <div className="app">
        <h1>iEnergy Digital Movies Hub</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="search">
                  <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                  />
                </div>

                {movies?.length > 0 ? (
                  <div className="container">
                    {movies.map((movie) => (
                      <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <div className="empty">
                    <h2>No Movies Found</h2>
                  </div>
                )}
              </>
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

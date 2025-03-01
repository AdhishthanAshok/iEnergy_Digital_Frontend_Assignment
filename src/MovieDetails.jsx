import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./MovieDetails.css";

const API_URL = "http://www.omdbapi.com?apikey=ea63f677";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await fetch(`${API_URL}&i=${id}`);
            const data = await response.json();
            setMovie(data);
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) return <h2>Loading...</h2>;

    return (
        <div className="movie-details">
            <button className="back-button" onClick={() => navigate("/")}>⬅ Back</button> {/* Use navigate for redirection */}
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-content">
                <h2>{movie.Title} ({movie.Year})</h2>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Plot:</strong> {movie.Plot}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
            </div>
        </div>
    );
}

export default MovieDetails;

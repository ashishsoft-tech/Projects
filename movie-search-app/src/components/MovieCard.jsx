import { useState, useEffect } from "react";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../utils/favorites";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // 🔥 prevent navigation

    if (fav) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }

    setFav(!fav);
  };

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="bg-white rounded-xl shadow hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden"
    >
      {/* ❤️ Button */}
      <button
        onClick={toggleFavorite}
        className="bg-white rounded-xl shadow hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden"
      >
        {fav ? "❤️" : "🤍"}
      </button>

      <img
  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400"}
  onError={(e) => (e.target.src = "https://via.placeholder.com/300x400")}
  alt={movie.Title}
/>

      <div className="bg-white rounded-xl shadow hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden">
        <h3 className="bg-white rounded-xl shadow hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden">{movie.Title}</h3>
      </div>
    </Link>
  );
}

export default MovieCard;
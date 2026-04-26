import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorites";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
  const update = () => setMovies(getFavorites());

  window.addEventListener("focus", update);
  return () => window.removeEventListener("focus", update);
}, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">❤️ Favorites</h1>

      {movies.length === 0 ? (
        <p>No favorite movies yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
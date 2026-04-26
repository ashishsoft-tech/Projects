import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";


function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");

 useEffect(() => {
  const delay = setTimeout(async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ Default keyword when query is empty
      const searchQuery = query ? query : "matrix";

      const data = await searchMovies(searchQuery, page, type);

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  }, 500);

  return () => clearTimeout(delay);
}, [query, type, page]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center">
        🎬 Movie Search
      </h1>
      
   
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border p-2 w-full mt-4"
      />

      {!query && (
  <p className="text-gray-500 mt-2">
    Showing popular movies...
  </p>
)}

      {/* Loading */}
      {loading && (
        <p className="text-center mt-4">{loading && (
  <div className="text-center mt-6">
    <p className="animate-pulse text-gray-500">
      Fetching movies...
    </p>
  </div>
)}</p>
      )}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      <select
  value={type}
  onChange={(e) => {
    setType(e.target.value);
    setPage(1);
  }}
  className="border p-2 mt-4"
>
  <option value="">All</option>
  <option value="movie">Movies</option>
  <option value="series">Series</option>
  <option value="episode">Episodes</option>
</select>


      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
  <button
    disabled={page === 1}
    onClick={() => {
      const newPage = page - 1;
      setPage(newPage);
    }}
    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span className="px-4 py-2">Page {page}</span>

  <button
    onClick={() => {
      const newPage = page + 1;
      setPage(newPage);
    }}ham
    className="px-4 py-2 bg-black text-white rounded"
  >
    Next
  </button>
</div>

      {/* No Results */}
      {!loading && movies.length === 0 && query && !error && (
  <div className="text-center mt-10">
    <p className="text-gray-500 text-lg">
      😕 No movies found for "{query}"
    </p>
  </div>
)}
    </div>
  );
}

export default Home;
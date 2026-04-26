import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const data = await getMovieDetails(id);

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // 🔄 Loading
  if (loading) {
    return <p className="text-center mt-10">Loading movie details...</p>;
  }

  // ❌ Error
  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Poster */}
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="w-full rounded-lg shadow"
        />

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold">{movie.Title}</h1>

          <p className="text-gray-600 mt-2">
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>

          <p className="mt-4">{movie.Plot}</p>

          <div className="mt-4 space-y-2">
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
          </div>

          {/* Ratings */}
          <div className="mt-4">
            <h3 className="font-semibold">Ratings:</h3>
            {movie.Ratings && movie.Ratings.length > 0 ? (
              movie.Ratings.map((rating, index) => (
                <p key={index}>
                  {rating.Source}: {rating.Value}
                </p>
              ))
            ) : (
              <p>No ratings available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
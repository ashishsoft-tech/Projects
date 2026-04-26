import axios from "axios";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

// Search Movies
export const searchMovies = async (query, page = 1, type = "") => {
  try
  {
     const res = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      s: query,
      page: page,
      type: type || undefined,
    },
  });
  
  return res.data;

  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
};

// Movie Details
export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: "full",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movie details");
  }
};
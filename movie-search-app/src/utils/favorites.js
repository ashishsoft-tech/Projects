const KEY = "favorites";

// Get favorites
export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

// Add to favorites
export const addFavorite = (movie) => {
  const favorites = getFavorites();

  // prevent duplicates
  const exists = favorites.find((m) => m.imdbID === movie.imdbID);
  if (!exists) {
    localStorage.setItem(KEY, JSON.stringify([...favorites, movie]));
  }
};

// Remove from favorites
export const removeFavorite = (id) => {
  const favorites = getFavorites();
  const updated = favorites.filter((m) => m.imdbID !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));
};

// Check if favorite
export const isFavorite = (id) => {
  const favorites = getFavorites();
  return favorites.some((m) => m.imdbID === id);
};
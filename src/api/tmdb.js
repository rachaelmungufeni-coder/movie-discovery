import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: import.meta.env.VITE_TMDB_API_KEY },
});

export const getTrending = () => api.get("/trending/all/week");
export const getPopularMovies = () => api.get("/movie/popular");
export const getPopularTV = () => api.get("/tv/popular");
export const getGenres = (type) => api.get(`/genre/${type}/list`);
export const discover = (type, genreId) =>
  api.get(`/discover/${type}`, { params: { with_genres: genreId } });
export const searchMulti = (query) =>
  api.get("/search/multi", { params: { query } });
export const getDetails = (type, id) => api.get(`/${type}/${id}`);

export const posterUrl = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
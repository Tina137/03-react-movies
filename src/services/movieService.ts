import axios from "axios";
import { type Movie } from "../types/movie";
interface MoviesHttpResponse {
  results: Movie[];
}
export default async function fetchMovies(query: string): Promise<Movie[]> {
  const res = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return res.data.results;
}

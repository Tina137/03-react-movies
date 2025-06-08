import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import fetchMovies from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import { type Movie } from "../../types/movie";

function App() {
  const [query, setQuery] = useState<string>("");
  const [moviesArr, setMoviesArr] = useState<Movie[]>([]);
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  function handleSearch(query: string) {
    setQuery(query);
  }

  useEffect(() => {
    if (!query) return;
    let ignore = false;
    setLoaderStatus(true);
    setErrorStatus(false);
    setMoviesArr([]);

    fetchMovies(query)
      .then((arrMovies) => {
        if (ignore) return;
        if (arrMovies.length === 0) {
          toast("No movies found for your request.");
        }
        setMoviesArr(arrMovies);
      })
      .catch(() => {
        if (!ignore) setErrorStatus(true);
      })
      .finally(() => {
        if (!ignore) setLoaderStatus(false);
      });

    return () => {
      ignore = true;
    };
  }, [query]);

  function onClose() {
    setModalStatus(false);
    setSelectedMovie(null);
  }

  function onSelect(movie: Movie) {
    setSelectedMovie(movie);
    setModalStatus(true);
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {loaderStatus && <Loader />}
      {errorStatus && <ErrorMessage />}
      <MovieGrid onSelect={onSelect} movies={moviesArr} />
      {modalStatus && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onClose} />
      )}
    </>
  );
}

export default App;

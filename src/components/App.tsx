import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import MovieGrid from "./MovieGrid/MovieGrid";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import MovieModal from "./MovieModal/MovieModal";
import fetchMovies from "../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import { type Movie } from "../types/movie";

function App() {
  const [query, setQuery] = useState<string>("");
  const [moviesArr, setMoviesArr] = useState<Movie[]>([]);
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  function onSubmit(formData: FormData) {
    const newQuery: string = String(formData.get("query"));
    if (newQuery == "") {
      toast("Please enter your search query.");
    } else {
      setQuery(newQuery);
    }
  }
  useEffect(() => {
    if (!query) return;
    let ignore = false;
    fetchMovies(query)
      .then((arrMovies) => {
        setLoaderStatus(true);
        setErrorStatus(false);
        setTimeout(() => {
          if (ignore) return;
          if (arrMovies.length === 0) {
            toast("No movies found for your request.");
          }
          setMoviesArr(arrMovies);
          setLoaderStatus(false);
        }, 1000);
      })
      .catch(() => {
        setErrorStatus(true);
      })
      .finally(() => setMoviesArr([]));

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
      <SearchBar onSubmit={onSubmit} />
      <Toaster />
      {loaderStatus && <Loader />}
      {errorStatus && <ErrorMessage />}
      <MovieGrid onSelect={onSelect} movies={moviesArr} />
      {modalStatus && <MovieModal movie={selectedMovie} onClose={onClose} />}
    </>
  );
}

export default App;

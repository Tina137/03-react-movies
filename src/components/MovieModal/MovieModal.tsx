import css from "./MovieModal.module.css";
import { type Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  if (movie != null) {
    return (
      <>
        <div className={css.backdrop} role="dialog" aria-modal="true">
          <div className={css.modal}>
            <button
              onClick={onClose}
              className={css.closeButton}
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movie_title"
              className={css.image}
            />
            <div className={css.content}>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <p>
                <strong>Release Date:</strong> {movie.release_date}
              </p>
              <p>
                <strong>Rating:</strong> {movie.vote_average}/10
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

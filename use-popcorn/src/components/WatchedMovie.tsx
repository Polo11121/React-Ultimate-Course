import { MouseEvent } from "react";
import { Movie } from "utils";

type WatchedMovieProps = {
  movie: Movie;
  onDelete?: (movieId: string) => void;
  onSelect?: (movieId: string) => void;
};

export const WatchedMovie = ({
  movie,
  onDelete,
  onSelect,
}: WatchedMovieProps) => {
  const deleteMovieHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onDelete?.(movie.imdbID);
  };

  const selectMovieHandler = () => onSelect?.(movie.imdbID);

  return (
    <li key={movie.imdbID} onClick={selectMovieHandler}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating + 1}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
        <button className="btn-delete" onClick={deleteMovieHandler}>
          X
        </button>
      </div>
    </li>
  );
};

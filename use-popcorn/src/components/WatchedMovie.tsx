import { Movie } from "utils";

type WatchedMovieProps = {
  movie: Movie;
  onClick?: (movieId: string) => void;
};

export const WatchedMovie = ({ movie, onClick }: WatchedMovieProps) => {
  const removeMovieHandler = () => onClick?.(movie.imdbID);

  return (
    <li key={movie.imdbID}>
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
        <button className="btn-delete" onClick={removeMovieHandler}>
          X
        </button>
      </div>
    </li>
  );
};

import { Movie } from "utils";

type MovieItemProps = {
  movie: Movie;
  onSelect?: (movieId: string) => void;
};

export const MovieItem = ({ movie, onSelect }: MovieItemProps) => {
  const selectMovieHandler = () => onSelect?.(movie.imdbID);

  return (
    <li key={movie.imdbID} onClick={selectMovieHandler}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

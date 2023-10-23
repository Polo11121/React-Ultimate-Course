import { Movie } from "utils";
import { WithLoader, WithError, Loader } from "components";

type MoviesListProps = {
  ListItem: (props: {
    movie: Movie;
    onSelect?: (movieId: string) => void;
    onDelete?: (movieId: string) => void;
  }) => JSX.Element;
  movies: Movie[];
  isLoading: boolean;
  error: string;
  onSelect?: (movieId: string) => void;
  onDelete?: (movieId: string) => void;
};

export const MoviesList = ({
  ListItem,
  movies,
  error,
  isLoading,
  onSelect,
  onDelete,
}: MoviesListProps) => (
  <WithLoader Loader={<Loader />} isLoading={isLoading}>
    <WithError errorMessage={error}>
      <ul className="list list-movies">
        {movies.length ? (
          movies.map((movie) => (
            <ListItem
              key={movie.imdbID}
              movie={movie}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          ))
        ) : (
          <h1>No movies found</h1>
        )}
      </ul>
    </WithError>
  </WithLoader>
);

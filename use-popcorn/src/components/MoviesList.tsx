import { Movie } from "utils";

type MoviesListProps = {
  ListItem: (props: { movie: Movie }) => JSX.Element;
  movies: Movie[];
};

export const MoviesList = ({ ListItem, movies }: MoviesListProps) => (
  <ul className="list">
    {movies.map((movie) => (
      <ListItem movie={movie} />
    ))}
  </ul>
);

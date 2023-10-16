import {
  Main,
  MoviesList,
  Navbar,
  NumResults,
  Search,
  Box,
  Summary,
  MovieItem,
  WatchedMovie,
  StarRating,
} from "components";
import { useState } from "react";
import { tempMovieData } from "utils";

export const App = () => {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <>
      <StarRating messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
      <Navbar>
        <Search onChange={setQuery} value={query} />
        <NumResults resultsCount={movies.length} />
      </Navbar>
      <Main>
        <Box>
          <MoviesList movies={movies} ListItem={MovieItem} />
        </Box>
        <Box>
          <Summary watched={watched} />
          <MoviesList movies={movies} ListItem={WatchedMovie} />
        </Box>
      </Main>
    </>
  );
};

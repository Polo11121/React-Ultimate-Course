import { useEffect, useState } from "react";
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
  MovieInfo,
} from "components";
import { Movie, tempMovieData } from "utils";
import { useFetch, useLocalStorageState } from "hooks";
import queryString from "query-string";

export const App = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [watched, setWatched] = useLocalStorageState<Movie[]>({
    initialValue: [],
    key: "watched",
  });
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const {
    data = [],
    isLoading,
    error,
  } = useFetch<Movie[]>({
    url: queryString.stringifyUrl({
      url: process.env.REACT_APP_API_URL!,
      query: {
        s: debouncedQuery,
        page: 1,
      },
    }),
    enabled: Boolean(debouncedQuery),
    path: "Search",
  });

  const movies = debouncedQuery ? data || [] : tempMovieData;

  const currentWatchedMovie = watched.find(
    (movie) => movie.imdbID === selectedMovie
  );

  const selectMovieHandler = (movieId: string) =>
    setSelectedMovie(movieId === selectedMovie ? null : movieId);

  const closeMovieInfoHandler = () => setSelectedMovie(null);

  const addToWatchedHandler = (movie: Movie, userRating: number) => {
    if (currentWatchedMovie) {
      setWatched((prevState) =>
        prevState.map((watchedMovie) =>
          watchedMovie.imdbID === movie.imdbID
            ? { ...watchedMovie, userRating }
            : watchedMovie
        )
      );
    } else {
      setWatched((prevState) => [...prevState, { ...movie, userRating }]);
    }

    closeMovieInfoHandler();
  };

  const removeFromWatchedHandler = (movieId: string) =>
    setWatched((prevState) =>
      prevState.filter((watchedMovie) => watchedMovie.imdbID !== movieId)
    );

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  return (
    <>
      <Navbar>
        <Search onChange={setQuery} value={query} />
        <NumResults resultsCount={movies.length} />
      </Navbar>
      <Main>
        <Box>
          <MoviesList
            onSelect={selectMovieHandler}
            movies={movies}
            ListItem={MovieItem}
            isLoading={isLoading}
            error={error}
          />
        </Box>
        <Box>
          {selectedMovie ? (
            <MovieInfo
              currentUserRating={currentWatchedMovie?.userRating}
              movieId={selectedMovie}
              onClose={closeMovieInfoHandler}
              onAddToWatched={addToWatchedHandler}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <MoviesList
                isLoading={false}
                error=""
                movies={watched}
                ListItem={WatchedMovie}
                onDelete={removeFromWatchedHandler}
                onSelect={selectMovieHandler}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

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

export const App = () => {
  const [movies, setMovies] = useState(tempMovieData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [watched, setWatched] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  const isSelectedMovieWatched = Boolean(
    watched.find((movie) => movie.imdbID === selectedMovie)
  );

  const selectMovieHandler = (movieId: string) =>
    setSelectedMovie(movieId === selectedMovie ? null : movieId);

  const closeMovieInfoHandler = () => setSelectedMovie(null);

  const addToWatchedHandler = (movie: Movie, userRating: number) => {
    if (isSelectedMovieWatched) {
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

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const reponse = await fetch(
          `${process.env.REACT_APP_API_URL}&s=${debouncedQuery}&page=1`,
          {
            signal: controller.signal,
          }
        );

        const data = await reponse.json();

        setMovies(data.Search || []);
      } catch (error: any) {
        if (error.name === "AbortError") return;

        console.error(error);
        setError(error.message);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!debouncedQuery) {
      setMovies(tempMovieData);
      setIsLoading(false);
      setError("");
      return;
    }

    fetchMovies();

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <>
      <Navbar>
        <Search onChange={setQuery} value={query} />
        <NumResults resultsCount={movies.length} />
      </Navbar>
      <Main>
        <Box>
          <MoviesList
            onClick={selectMovieHandler}
            movies={movies}
            ListItem={MovieItem}
            isLoading={isLoading}
            error={error}
          />
        </Box>
        <Box>
          {selectedMovie ? (
            <MovieInfo
              isWatched={isSelectedMovieWatched}
              key={selectedMovie}
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
                onClick={removeFromWatchedHandler}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

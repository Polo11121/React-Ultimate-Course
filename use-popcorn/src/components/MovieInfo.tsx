import { useState } from "react";
import { Movie } from "utils";
import { WithLoader, Loader, WithError, StarRating } from "components";
import { useClickKeyboardKey, useFetch } from "hooks";
import queryString from "query-string";

type MovieInfoProps = {
  movieId: string;
  onClose: () => void;
  onAddToWatched: (movie: Movie, userRating: number) => void;
  currentUserRating?: number;
};

export const MovieInfo = ({
  movieId,
  onClose,
  onAddToWatched,
  currentUserRating,
}: MovieInfoProps) => {
  const [userRating, setUserRating] = useState(0);
  const {
    data: movieInfo,
    isLoading,
    error,
  } = useFetch<Movie>({
    url: queryString.stringifyUrl({
      url: process.env.REACT_APP_API_URL!,
      query: {
        i: movieId,
      },
    }),
    enabled: Boolean(movieId),
  });
  useClickKeyboardKey({ type: "escape", callback: onClose });

  const addToWatchedHandler = () => onAddToWatched(movieInfo!, userRating);

  const rateMovieHandler = (rating: number) => setUserRating(rating);

  return (
    <div className="details">
      <WithLoader Loader={<Loader />} isLoading={isLoading}>
        <WithError errorMessage={error}>
          <header>
            <button className="btn-back" onClick={onClose}>
              {"<"}
            </button>
            <img
              src={movieInfo?.Poster}
              alt={`Poster of ${movieInfo?.Title}`}
            />
            <div className="details-overview">
              <h2>{movieInfo?.Title}</h2>
              <p>
                {movieInfo?.Released} &bull; {movieInfo?.Runtime}
              </p>
              <p>{movieInfo?.Genre}</p>
              <p>
                <span>⭐</span> {movieInfo?.imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating
                defaultRating={currentUserRating}
                onRate={rateMovieHandler}
                maxRating={10}
                size={24}
              />
              {
                <button className="btn-add" onClick={addToWatchedHandler}>
                  {currentUserRating !== undefined ? "Update" : "+ Add to list"}
                </button>
              }
            </div>
            <p>
              <em>{movieInfo?.Plot}</em>
            </p>
            <p>Starring: {movieInfo?.Actors}</p>
            <p>Directed by {movieInfo?.Director}</p>
          </section>
        </WithError>
      </WithLoader>
    </div>
  );
};

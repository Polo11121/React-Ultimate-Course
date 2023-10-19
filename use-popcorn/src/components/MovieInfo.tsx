import { useEffect, useState } from "react";
import { Movie } from "utils";
import { WithLoader, Loader, WithError, StarRating } from "components";

type MovieInfoProps = {
  movieId: string;
  onClose: () => void;
  onAddToWatched: (movie: Movie, userRating: number) => void;
  isWatched: boolean;
};

export const MovieInfo = ({
  movieId,
  onClose,
  onAddToWatched,
  isWatched,
}: MovieInfoProps) => {
  const [movieInfo, setMovieInfo] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const addToWatchedHandler = () => onAddToWatched(movieInfo!, userRating);

  const rateMovieHandler = (rating: number) => setUserRating(rating);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        setIsLoading(true);
        const reponse = await fetch(
          `${process.env.REACT_APP_API_URL}&i=${movieId}`
        );

        const data: Movie = await reponse.json();

        setMovieInfo(data);

        document.title = data.Title;
      } catch (error: any) {
        console.error(error);
        setError(error.message);
        setMovieInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieInfo();

    return () => {
      document.title = "usePopcorn";
    };
  }, []);

  useEffect(() => {
    const goBack = () =>
      document.addEventListener("keydown", (event) => {
        if (event.code === "Escape") {
          onClose();
        }
      });

    goBack();

    return () => document.removeEventListener("keydown", goBack);
  });

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
              <StarRating onRate={rateMovieHandler} maxRating={10} size={24} />
              {
                <button className="btn-add" onClick={addToWatchedHandler}>
                  {isWatched ? "Update" : "+ Add to list"}
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

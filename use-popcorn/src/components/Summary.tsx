import { Movie, average } from "utils";

type SummaryProps = {
  watched: Movie[];
};

export const Summary = ({ watched }: SummaryProps) => {
  const avgImdbRating = average(
    watched.map((movie) => Number(movie.imdbRating))
  ).toFixed(1);
  const avgUserRating = average(
    watched.map((movie) => Number(movie.userRating) + 1)
  ).toFixed(1);
  const avgRuntime = average(
    watched.map((movie) => Number(movie.Runtime.split(" ")[0]))
  ).toFixed(1);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

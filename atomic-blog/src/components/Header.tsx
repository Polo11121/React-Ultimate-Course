import { Results, SearchPosts } from "components";
import { useBlogContext } from "context/BlogProvider";

export const Header = () => {
  const { onClearPosts } = useBlogContext();

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
};

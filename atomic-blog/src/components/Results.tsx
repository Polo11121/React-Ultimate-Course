import { useBlogContext } from "context/BlogProvider";

export const Results = () => {
  const { posts } = useBlogContext();

  return <p>🚀 {posts.length} atomic posts found</p>;
};

import { useBlogContext } from "context/BlogProvider";

export const SearchPosts = () => {
  const { searchQuery, setSearchQuery } = useBlogContext();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
};

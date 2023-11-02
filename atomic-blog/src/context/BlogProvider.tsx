import { createContext, ReactNode, useContext, useState } from "react";
import { createRandomPost, Post } from "lib";

type BlogProviderProps = {
  children: ReactNode;
};

type BlogContextValue = {
  posts: Post[];
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  onAddPost: (post: Post) => void;
  onClearPosts: () => void;
};

const BlogContext = createContext<BlogContextValue>({
  posts: [],
  onAddPost: () => {},
  onClearPosts: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  const handleAddPost = (post: Post) => setPosts((posts) => [post, ...posts]);

  const handleClearPosts = () => setPosts([]);

  const value = {
    posts: searchedPosts,
    searchQuery,
    setSearchQuery,
    onAddPost: handleAddPost,
    onClearPosts: handleClearPosts,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);

  if (context === undefined) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }

  return context;
};

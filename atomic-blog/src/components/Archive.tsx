import { useState } from "react";
import { createRandomPost } from "lib";
import { useBlogContext } from "context/BlogProvider";

export const Archive = () => {
  const { onAddPost } = useBlogContext();
  const [showArchive, setShowArchive] = useState(false);
  const [posts] = useState(() =>
    Array.from({ length: 10000 }, () => createRandomPost())
  );

  const showHandler = () => setShowArchive((prevState) => !prevState);

  return (
    <aside>
      <h2>Post archive</h2>
      <button onClick={showHandler}>
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>
      {showArchive && (
        <ul>
          {posts.map((post, i) => {
            const addPostHandler = () => onAddPost(post);

            return (
              <li key={i}>
                <p>
                  <strong>{post.title}:</strong> {post.body}
                </p>
                <button onClick={addPostHandler}>Add as new post</button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
};

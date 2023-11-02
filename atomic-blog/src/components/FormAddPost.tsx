import { FormEvent, useState } from "react";
import { useBlogContext } from "context/BlogProvider";

export const FormAddPost = () => {
  const { onAddPost } = useBlogContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!body || !title) {
      return;
    }

    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const changeBodyHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBody(event.target.value);

  return (
    <form onSubmit={submitHandler}>
      <input
        value={title}
        onChange={changeTitleHandler}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={changeBodyHandler}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
};

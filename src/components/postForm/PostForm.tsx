import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux-toolkit/postSlice";
export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const handleInput = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    callback: React.Dispatch<React.SetStateAction<string>>
  ) => callback(e.currentTarget.value);
  const handleAddPost = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addPost(title, body));
  };
  return (
    <form className=" container__width flex flex-col text-blue-600">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => handleInput(e, setTitle)}
      />
      <label htmlFor="body">body</label>
      <textarea value={body} onChange={(e) => handleInput(e, setBody)} />
      <select></select>
      <button type="submit" onClick={handleAddPost}>
        Submit
      </button>
    </form>
  );
};

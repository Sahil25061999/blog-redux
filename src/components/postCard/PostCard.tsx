import { useDispatch } from "react-redux";
import React from "react";
import { Post, updateVotes } from "../../redux-toolkit/postSlice";
export const PostCard = React.memo(function ({
  id,
  title,
  body,
  emoticons,
}: Post) {
  const dispatch = useDispatch();
  const handleVotes = (emoji: string, id: number | string) => {
    dispatch(updateVotes({ emoji, id }));
  };
  return (
    <div className=" my-4 border-2 p-4 border-white">
      <h1 className=" text-3xl">{title}</h1>
      <p className=" mt-1">{body}</p>
      <div className="flex flex-row">
        {Object.entries(emoticons).map(([emoji, vote]) => (
          <div key={id} className=" flex flex-row">
            <button onClick={() => handleVotes(emoji, id)}>{emoji}</button>
            <p>{vote}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

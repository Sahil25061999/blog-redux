import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux-toolkit/store";
import { useEffect } from "react";
import { fetchPosts } from "../../redux-toolkit/postSlice";
import { getAllPosts } from "../../redux-toolkit/postSlice";

export const PostList = () => {
  const posts = useSelector(getAllPosts);
  const status = useSelector((state: RootState) => state.posts.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        if (status === "idle") {
          dispatch(fetchPosts());
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div>
      {posts.length > 0 ? posts.map((item) => <p>{item.title}</p>) : null}
    </div>
  );
};

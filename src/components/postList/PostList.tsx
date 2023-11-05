import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux-toolkit/store";
import { useEffect } from "react";
import { fetchPosts } from "../../redux-toolkit/postSlice";
import { getAllPosts } from "../../redux-toolkit/postSlice";
import { PostCard } from "../index.component";

export const PostList = () => {
  const posts = useSelector(getAllPosts);
  const status = useSelector((state: RootState) => state.posts.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        if (status === "idle") {
          dispatch(fetchPosts()).unwrap();
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className="container__width">
      {posts.length > 0
        ? posts.map((item) => <PostCard key={item.id} {...item} />)
        : null}
    </div>
  );
};

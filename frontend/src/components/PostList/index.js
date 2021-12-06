import "./postList.css";
import PostContainer from "./PostContainer";
import * as postActions from "../../store/post";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
function PostList() {
  const postList = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getPost());
  }, []);
  return (
    <div className="wrapContent">
      <div className="tab">
        <p>Games</p>
      </div>
      <div className="content">
        <div className="postContainer">
          {postList.map((e) => {
            return <div key={e.id}><PostContainer post={e} /></div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default PostList;

import "./postList.css";
import PostContainer from "./PostContainer";
import * as postActions from "../../store/post";
import {getSinglePost} from "../../store/postProfile"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {toggle} from "../../store/postshow"
function PostList() {
  const postList = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getPost());
  }, [dispatch]);
  return (
    <div className="wrapContent">
      <div className="tab">
        <p>Games</p>
      </div>
      <div className="content">
        <div className="postContainer">
          {postList.map((post) => {
            return <div key={post.id} onClick={(e) => {
                dispatch(toggle(post.id));
                dispatch(getSinglePost(post.id));
            }}><PostContainer post={post} /></div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default PostList;

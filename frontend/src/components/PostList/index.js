import "./postList.css";
import PostContainer from "./PostContainer";
import * as postActions from "../../store/post";
import {getSinglePost} from "../../store/postProfile"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {toggle} from "../../store/postshow"
import {useHistory} from "react-router-dom"
function PostList() {
  const postList = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const hist = useHistory();
  useEffect(() => {
    dispatch(postActions.getPost());
  }, []);
  return (
    <div className="wrapContent">
      <div className="tab">
        <h2 className="title">Is the next 🦄 here?</h2>
      </div>
      <div className="content">
        <div className="postContainer">
          {postList.map((post) => {
            return <div key={post.id} onClick={(e) => {
                dispatch(toggle(post.id));
                dispatch(getSinglePost(post.id));
                hist.push(`/posts/${post.id}`);
            }}><PostContainer post={post} /></div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default PostList;

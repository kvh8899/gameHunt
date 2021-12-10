import "./postList.css";
import PostContainer from "./PostContainer";
import * as postActions from "../../store/post";
import {getSinglePost} from "../../store/postProfile"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {toggle} from "../../store/postshow"
import {useHistory} from "react-router-dom"
import {getPostComments} from '../../store/comments';
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
          {postList.map((post,index) => {
            return <div key={post.id} onClick={async(e) => {
                await dispatch(toggle(post.id));
                await dispatch(getPostComments(post.id));
                await dispatch(getSinglePost(post.id));
                hist.push(`/posts/${post.id}`);
            }}><PostContainer post={post} index={index} /></div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default PostList;

import "./postList.css";
import PostContainer from "./PostContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {useHistory} from "react-router-dom";
import {toggle} from "../../store/postshow";
import * as postActions from "../../store/post";
import {getSinglePost} from "../../store/postProfile"
import {getPostComments} from '../../store/comments';


function PostList() {
  const postList = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const hist = useHistory();
  useEffect(() => {
    dispatch(postActions.getPost());
  }, [comments]);
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

import "./PostProfile.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../store/postshow";
//import { useEffect, useRef, useState } from "react";
function PostProfile({ suHidden }) {
  const postShow = useSelector((state) => state.postShow);
  const postProfileData = useSelector((state) => state.postProfile);
  const sessionUser = useSelector((state) => state.session.user);
  const hist = useHistory();
  const dispatch = useDispatch();
  console.log(postProfileData);
  if (postShow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  return postShow ? (
    <div className="profileWrapper">
      <div className="darken modal"></div>
      <button className="profExit">X</button>
      <div
        className="profileContent"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="profileHeader">
          <img
            className="listImg"
            src={postProfileData[0]?.headerImage}
            alt="404 not found"
          ></img>
          <div className="profHeadings">
            <h2>{postProfileData[0]?.header}</h2>
            <h3>{postProfileData[0]?.subHeader}</h3>
          </div>
        </div>
        <div className="mainContent">
          <div className="imgContainer">
            <div className="imageContentWrap">
              <img
                className="imageContent"
                src={postProfileData[0]?.contentImage}
                alt="404 not found"
              ></img>
            </div>
            <div className="divider"> </div>
            <p className="description">{postProfileData[0]?.description}</p>
          </div>
          <div className="profData">
            <h3>Maker: {postProfileData[1]?.User?.username}</h3>
            <h3>
              Created:
              {new Date(
                Date.parse(postProfileData[0]?.createdAt)
              ).toLocaleDateString("en-US")}
            </h3>
            {sessionUser?.id === postProfileData.userId ? (
              <button
                className="edit"
                onClick={(e) => {
                  hist.push(`/posts/${postProfileData.id}/edit`);
                  dispatch(toggle(null));
                }}
              >
                Edit
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="commentsInput fixed">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!sessionUser) {
                hist.push("/");
                suHidden.setSuHidden(false);
              }
            }}
          >
            <input placeholder="What are your thoughts?" required></input>
            <button>Submit</button>
          </form>
        </div>
        <div className="ss"></div>
        <div className="commentsContainer">
          <p>Comments {`(${postProfileData[0]?.Comments?.length})`}</p>
          {postProfileData[0]?.Comments?.map((e) => {
            return (
              <div key={e.id} className="comment">
                <p>{e.User.username}</p>
                <p className="cContent">{e.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PostProfile;

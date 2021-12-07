import "./PostProfile.css";
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
//import { useEffect, useRef, useState } from "react";
function PostProfile({suHidden}) {
  const postShow = useSelector((state) => state.postShow);
  const postProfileData = useSelector((state) => state.postProfile);
  const sessionUser = useSelector((state) => state.session.user);
  const hist = useHistory();
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
            src={postProfileData.headerImage}
            alt="Nothing here!"
          ></img>
          <div className="profHeadings">
            <h2>{postProfileData.header}</h2>
            <h3>{postProfileData.subHeader}</h3>
          </div>
        </div>
        <div className="mainContent">
          <div className="imgContainer">
            <div className="imageContentWrap">
              <img
                className="imageContent"
                src={postProfileData.contentImage}
                alt="none"
              ></img>
            </div>
            <div className="divider"> </div>
            <p className="description">{postProfileData.description}</p>
          </div>
          <div className="profData">
            <h3>Maker: {postProfileData?.User?.username}</h3>
            <h3>
              Created:
              {new Date(
                Date.parse(postProfileData.createdAt)
              ).toLocaleDateString("en-US")}
            </h3>
            <button className="edit">Edit</button>
          </div>
        </div>
        <div className="commentsInput fixed">
          <form onSubmit={(e) => {
            e.preventDefault();
            if(!sessionUser){
              hist.push("/");
              suHidden.setSuHidden(false);
            } 
          }}>
            <input placeholder="What are your thoughts?" required></input>
            <button>Submit</button>
          </form>
        </div>
        <div className="ss"></div>
        <div className="commentsContainer">
          <p>Comments</p>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PostProfile;

import "./PostProfile.css";
import { useSelector } from "react-redux";
import postProfile from "../../store/postProfile";
function PostProfile() {
  const postShow = useSelector((state) => state.postShow);
  const postProfileData = useSelector((state) => state.postProfile);
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
          <img className="listImg" src={postProfileData.headerImage} alt="Nothing here!"></img>
          <div className="profHeadings">
            <h2>{postProfileData.header}</h2>
            <h3>{postProfileData.subHeader}</h3>
          </div>
        </div>
        <div className="imgContainer"><img className="imageContent" src={postProfileData.contentImage} alt="none"></img></div>
        <div> </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PostProfile;

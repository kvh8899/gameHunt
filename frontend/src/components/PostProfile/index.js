import "./PostProfile.css"
import { useSelector } from "react-redux";
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
          </div>
        </div>
      </div>
      
    </div>
  ) : (
    ""
  );
}

export default PostProfile;

import "./PostProfile.css";
import { useSelector } from "react-redux";
function PostProfile() {
  const postShow = useSelector((state) => state.postShow);
  return postShow ? (
    <div className="profileWrapper">
      <div className="darken modal"></div>
      <button className="profExit">X</button>
      <div className="profileContent" onClick={(e) => {
          e.stopPropagation();
        }}>{postShow}</div>
    </div>
  ) : (
    ""
  );
}

export default PostProfile;

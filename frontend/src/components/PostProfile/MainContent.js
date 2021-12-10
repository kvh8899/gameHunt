import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../store/postshow";
function MainContent({suHidden}) {
    const postProfileData = useSelector((state) => state.postProfile);
    const sessionUser = useSelector((state) => state.session.user);
    const hist = useHistory();
    const dispatch = useDispatch();
    return (
        <div className="mainContent">
          <div className="imgContainer">
            <div className="imageContentWrap">
              <img
                className="imageContent"
                src={postProfileData.contentImage}
                alt="404 not found"
              ></img>
            </div>
            <div className="divider"> </div>
            <p className="description">{postProfileData.description}</p>
          </div>
          <div className="profData">
            {/* User.username is null on first load so check null first*/}
            <h3>Maker: {postProfileData?.User?.username}</h3>
            <h3>
              Created:
              {new Date(
                Date.parse(postProfileData.createdAt)
              ).toLocaleDateString("en-US")}
            </h3>
            {sessionUser?.id === postProfileData.userId ? (
              <button
                className="edit"
                onClick={(e) => {
                  if (!sessionUser) {
                    hist.push("/");
                    suHidden.setSuHidden(false);
                  }
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
    )
}
export default MainContent;
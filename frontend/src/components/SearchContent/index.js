import "./SearchContent.css";
import {getSinglePost} from "../../store/postProfile"
import { useSelector,useDispatch } from "react-redux";
import {toggle} from "../../store/postshow"
import {useHistory} from "react-router-dom"
function SearchContent({ width }) {
  const posts = useSelector((state) => state.searchData);
  const dispatch = useDispatch();
  const hist = useHistory();
  return (
    <div
      className="searchWrapper"
      style={{ width: width?.current?.offsetWidth }}
    >
      {posts ? (
        posts.map((e) => {
          return (
            <div key={e.id} className="searchPost" onClick={(event) => {
                console.log(event.target);
                dispatch(toggle(e.id));
                dispatch(getSinglePost(e.id));
                hist.push(`/posts/${e.id}`);
            }}>
              <div className="imgContain">
                <img
                  src={e.headerImage}
                  alt="404 not found"
                  className="listImg"
                ></img>
              </div>
              <div className="searchHeadings">
                <p className="header">{e.header}</p>
                <p className="subHeader">{e.subHeader}</p>
              </div>
            </div>
          );
        })
      ) : (
        <i class="fas fa-circle-notch fa-spin"></i>
      )}
    </div>
  );
}

export default SearchContent;

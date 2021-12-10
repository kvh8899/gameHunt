import "./SearchContent.css";

import { useSelector } from "react-redux";

function SearchContent({ width }) {
  const posts = useSelector((state) => state.searchData);
  return (
    <div
      className="searchWrapper"
      style={{ width: width?.current?.offsetWidth }}
    >
      {posts ? (
        posts.map((e) => {
          return (
            <div key={e.id} className="searchPost">
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

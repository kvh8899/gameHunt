import LoginFormPage from "../loginForm";
import SignupFormPage from "../signUpForm";
import PostProfile from "../PostProfile";
import SearchContent from "../SearchContent";
import "./home.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import * as postActions from "../../store/post";
import { toggle } from "../../store/postshow";
import { getSinglePost } from "../../store/postProfile";
import { searchPosts } from "../../store/search";
import { getPostComments } from "../../store/comments";
import { showAction } from "../../store/searchShow";
import { showContentAction } from "../../store/searchContentHidden";
import { useRef } from "react";

function HomePage() {
  const [hidden, setHidden] = useState(true);
  const [suHidden, setSuHidden] = useState(true);
  const [search, setSearch] = useState("");
  const posts = useSelector((state) => state.searchData);
  const sessionUser = useSelector((state) => state.session.user);
  const searchHide = useSelector((state) => state.searchHide);
  const searchContentHidden = useSelector((state) => state.searchContentHidden);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const bar = useRef(null);

  useEffect(() => {
    if (id) {
      dispatch(toggle(id));
      dispatch(getSinglePost(id));
      dispatch(getPostComments(id));
      history.push(`/posts/${id}`);
    }
  }, [id, dispatch, history]);
  return (
    <div
      className="body"
      onClick={(e) => {
        setHidden(true);
        setSuHidden(true);
        history.push("/");
      }}
    >
      <nav>
        <div className="entireNav">
          <div className="leftNav">
            <Link to="/">
              <img className="logo" src="/gameHunt.png" alt="logo" onClick={(e) => {
                dispatch(postActions.getPost())
              }}></img>
            </Link>
            <div className="searchBar" ref={bar}>
              <form onSubmit={(e) => {
                e.preventDefault();
                if(search){
                  dispatch(postActions.getPosts(posts))
                }
                dispatch(showAction(true));
                dispatch(showContentAction(true));
              }}>
              <input
                onClick={(e) => {
                  e.stopPropagation();
                }}
                placeholder="Search for games"
                value={search}
                onFocus={(e) => {
                  dispatch(showAction(false));
                  dispatch(showContentAction(false));
                }}
                onBlur={(e) => {
                  if (searchContentHidden !== null) dispatch(showContentAction(true));
                  if (searchHide !== null) dispatch(showAction(true));
                }}
                onChange={async (e) => {
                  setSearch(e.target.value);
                  await dispatch(searchPosts(e.target.value));
                  if (e.target.value) {
                    dispatch(showContentAction(false));
                    dispatch(showAction(false));
                  } else {
                    dispatch(showContentAction(true));
                  }
                }}
              ></input>
              
              </form>
              {!searchContentHidden ? <SearchContent /> : ""}
            </div>
            {searchHide ? (
              <div className="util">
                {sessionUser ? (
                  <p>
                    {sessionUser.username}
                  </p>
                ) : (
                  ""
                )}
                <Link to="/about" onClick={(e) => {
                  e.stopPropagation();
                }}>About</Link>
              </div>
            ) : (
              ""
            )}
          </div>
          {searchHide ? (
            <div className="rightNav">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!sessionUser) {
                    setSuHidden(false);
                  } else {
                    history.push("/posts/new");
                  }
                }}
              >
                <i className="fa fa-plus"></i>
              </button>
              {!sessionUser ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHidden(false);
                  }}
                >
                  Sign In
                </button>
              ) : (
                ""
              )}
              {!sessionUser ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSuHidden(false);
                  }}
                >
                  Sign Up
                </button>
              ) : (
                ""
              )}
              {!sessionUser ? (
                ""
              ) : (
                <button
                  onClick={(e) => {
                    dispatch(sessionActions.logout());
                    history.push("/");
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      <LoginFormPage hidden={{ hidden, setHidden }} />
      <SignupFormPage suHidden={{ suHidden, setSuHidden }} />
      <PostProfile suHidden={{ suHidden, setSuHidden }} />
    </div>
  );
}
export default HomePage;

import LoginFormPage from "../loginForm";
import SignupFormPage from "../signUpForm";
import PostProfile from "../PostProfile";
import SearchContent from "../SearchContent";
import "./home.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { toggle } from "../../store/postshow";
import { getSinglePost } from "../../store/postProfile";
import { useRef } from "react";
import { searchPosts } from "../../store/search";
function HomePage() {
  const [hidden, setHidden] = useState(true);
  const [suHidden, setSuHidden] = useState(true);
  const [searchHide, setSearchHide] = useState(true);
  const [search, setSearch] = useState("");
  const [searchContentHidden, setSearchContentHidden] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const bar = useRef(null);
  useEffect(() => {
    if (id) {
      dispatch(toggle(id));
      dispatch(getSinglePost(id));
      history.push(`/posts/${id}`);
    }
  }, [id, dispatch, history]);
  
  return (
    <div
      className="body"
      onClick={(e) => {
        e.preventDefault();
        setHidden(true);
        setSuHidden(true);
        setSearchContentHidden(true);
        setSearchHide(true);
        history.push("/");
      }}
    >
      <nav>
        <div className="entireNav">
          <div className="leftNav">
            <Link to="/">
              <img className="logo" src="/gameHunt.png" alt="logo"></img>
            </Link>
            <div className="searchBar" ref={bar}>
              <input
                onClick={(e) => {
                  e.stopPropagation();
                }}
                placeholder="Search for games"
                value={search}
                onFocus={(e) => {
                  setSearchHide(false);
                }}
                onBlur={(e) => {
                  setSearch("");
                }}
                onChange={(e) => {
                  dispatch(searchPosts(e.target.value));
                  setSearch(e.target.value);

                  if (e.target.value) {
                    setSearchContentHidden(false);
                  } else {
                    setSearchContentHidden(true);
                  }
                }}
              ></input>
              {!searchContentHidden ? <SearchContent /> : ""}
            </div>
           {searchHide? <div className="util">
              <Link to="/">About</Link>
              {sessionUser ? (
                <Link to="/" className="name">
                  Welcome {sessionUser.username}!
                </Link>
              ) : (
                ""
              )}
            </div>: ""} 
          </div>
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
        </div>
      </nav>
      <LoginFormPage hidden={{ hidden, setHidden }} />
      <SignupFormPage suHidden={{ suHidden, setSuHidden }} />
      <PostProfile suHidden={{ suHidden, setSuHidden }} />
    </div>
  );
}
export default HomePage;

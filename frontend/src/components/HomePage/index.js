import LoginFormPage from "../loginForm";
import SignupFormPage from "../signUpForm";
import PostProfile from "../PostProfile";
import "./home.css";
import { Link,useHistory,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { toggle } from "../../store/postshow";
import {getSinglePost,getOnePost} from "../../store/postProfile"

function HomePage() {
  const [hidden, setHidden] = useState(true);
  const [suHidden, setSuHidden] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams();
  useEffect(() => {
    if(id){
      dispatch(toggle(id));
      dispatch(getSinglePost(id));
      history.push(`/posts/${id}`);
    }else{
      dispatch(toggle(null));
    }
  },[id])
  return (
    <div
      className="body"
      onClick={(e) => {
        e.preventDefault();
        setHidden(true);
        setSuHidden(true);
        dispatch(toggle(null));
        dispatch(getOnePost({}));
        history.push("/");
      }}
    >
      <nav>
        <div className="leftNav">
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <input placeholder="Search for games"></input>
          {sessionUser ? (
            <Link to="/">Welcome {sessionUser.username}!</Link>
          ) : (
            ""
          )}
        </div>

        <div>
          <button onClick={(e) => {
            e.stopPropagation();
            if(!sessionUser){
              setSuHidden(false)
            }else{
              history.push("/posts/new")
            }
          }}>
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
                history.push("/")
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      <LoginFormPage hidden={{ hidden, setHidden }} />
      <SignupFormPage suHidden={{ suHidden, setSuHidden }} />
      <PostProfile />
    </div>
  );
}
export default HomePage;

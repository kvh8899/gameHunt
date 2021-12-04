import LoginFormPage from "../loginForm";
import "./home.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
function HomePage() {
  const [hidden, setHidden] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  return (
    <div
      className="body"
      onClick={(e) => {
        setHidden(true);
      }}
    >
      <nav>
        <div className="leftNav">
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <input placeholder="Search for games"></input>
          {sessionUser?<Link to="/">Welcome {sessionUser.username}!</Link>:""}
        </div>

        <div>
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
          <button>Products</button>
          {!sessionUser ? <button>Sign Up</button> : ""}
          {!sessionUser ? (
            ""
          ) : (
            <button
              onClick={(e) => {
                dispatch(sessionActions.logout());
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      <LoginFormPage hidden={{ hidden, setHidden }} />
    </div>
  );
}
export default HomePage;

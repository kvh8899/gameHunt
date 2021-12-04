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
  function hide(user, hidden) {
    if (hidden || user) {
      //is hidden
      return true;
    }
    return false;
  }
  return (
    <div
      className="body"
      onClick={(e) => {
        setHidden(true);
      }}
    >
      <nav className={hide(sessionUser, hidden) ? "" : "darken"}>
        <Link to="/">Home</Link>
        {!sessionUser ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHidden(false);
            }}
            className={!hidden ? "darkenButton" : ""}
          >
            Sign In
          </button>
        ) : (
          ""
        )}
        {!sessionUser ? (
          <button className={!hidden ? "darkenButton" : ""}>Sign Up</button>
        ) : (
          ""
        )}
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
        <button className={hide(sessionUser, hidden) ? "" : "darkenButton"}>Products</button>
      </nav>
      <LoginFormPage hidden={{ hidden, setHidden }} />
    </div>
  );
}
export default HomePage;

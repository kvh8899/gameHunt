import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect ,useHistory} from "react-router-dom";
import "./loginForm.css";
function LoginFormPage({ hidden }) {
  const dispatch = useDispatch();
  const hist = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  function reset() {
    setCredential("");
    setPassword("");
  }
  useEffect(() => {
    if (sessionUser) {
      reset();
    }
  }, [sessionUser]);
  useEffect(() => {
    if (!hidden.hidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [hidden.hidden]);
  if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    reset();
  };

  return !hidden.hidden ? (
    <div className="login">
      <div className="darken modal"></div>
      <button className="exit">X</button>
      <div
        className="formElement formWrapper"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username or Email</label>
            <input
              type="text"
              className="formElement"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              className="formElement"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              id="demo"
              onClick={(e) => {
                setCredential("Demo-lition");
                setPassword("password");
              }}
            >
              Log in as demo
            </button>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default LoginFormPage;

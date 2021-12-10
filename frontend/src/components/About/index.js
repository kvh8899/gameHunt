import "./About.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
function About() {
  const outer = useRef(null);
  useEffect(() => {
    outer.current.classList.add("fade");
  }, []);
  return (
    <>
      <div className="body">
        <nav>
          <div className="entireNav">
            <div className="leftNav blankNav">
              <Link to="/">
                <img className="logo" src="/gameHunt.png" alt="logo"></img>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="aboutContent" ref={outer}>
        <h2>About GameHunt</h2>
        <p>
          Hello, and welcome to GameHunt! Share your game creations or have a
          discussion with other users!
        </p>
        <h2>The Team</h2>
        <p>Kyle (Solo Project!)</p>
        <img
          src="gameHuntLogo.png"
          alt="huh? theres supposed to be a logo here"
        ></img>
        <p>This project was made week 16 at App Academy.</p>
        <div className="links">
          <a href="https://github.com/kvh8899/gameHunt">
            Github for this website
          </a>
          <a href="https://www.linkedin.com/in/kylevhuang461/">My LinkedIn</a>
        </div>
      </div>
    </>
  );
}

export default About;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignupFormPage from "./components/signUpForm";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;

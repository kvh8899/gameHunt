import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost"
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <Switch>
        <Route exact path="/">
          <HomePage />
          <PostList />
        </Route>
        <Route exact path="/posts/new">
          <HomePage />
          <CreatePost />
        </Route>
        <Route exact path="/posts/:id">
          <HomePage />
          <PostList />
        </Route>
        <Route path="/posts/:id/edit">
          <HomePage />
          <EditPost />
        </Route>
      </Switch>
    )
  );
}

export default App;

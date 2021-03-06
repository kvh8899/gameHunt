import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import postReducer from './post';
import psReducer from './postshow';
import postProfile from './postProfile';
import searchReducer from './search';
import commentsReducer from './comments'
import searchHideReducer from "./searchShow";
import searchContentReducer from "./searchContentHidden";
const rootReducer = combineReducers({
  session: sessionReducer,
  posts: postReducer,
  postShow: psReducer,
  postProfile,
  searchData:searchReducer,
  comments:commentsReducer,
  searchHide:searchHideReducer,
  searchContentHidden:searchContentReducer
});


let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};


export default configureStore;

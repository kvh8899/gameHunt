import { csrfFetch } from "./csrf";
const GETPOST = "post/getpost";
const getPosts = (data) => {
  return {
    type: GETPOST,
    payload: data,
  };
};

export const getPost = () => async (dispatch) => {
  const res = await fetch("/api/posts");
  const data = await res.json();
  dispatch(getPosts(data));
  return data;
};

const postReducer = (state = [], action) => {
  switch (action.type) {
    case GETPOST:
      return [...action.payload];
    default:
      return state;
  }
};

export default postReducer;

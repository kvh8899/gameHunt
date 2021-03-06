import { csrfFetch } from "./csrf";
import { toggle } from "./postshow";

const GETONEPOST = "post/getonepost";
const getOnePost = (data) => {
  return {
    type: GETONEPOST,
    payload: data,
  };
};

//get a specific post
export const getSinglePost = (id) => async (dispatch) => {
  if(!id){
    dispatch(getOnePost({}))
    return;
  } 
  const res = await fetch(`/api/posts/${id}`);
  if (res.ok) {
    const data = await res.json();
    await dispatch(getOnePost(data));
    return data;
  }
};

//make a post
export const Post = (data) => async (dispatch) => {
  const res = await csrfFetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const cPost = await res.json();
    await dispatch(toggle(cPost.id));
    return cPost;
  }
};

//update a post
export const updatePost = (data, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${id}/edit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    await dispatch(toggle(id));
    return id;
  }
};

// load a specific post into state
function postProfile(state = {}, action) {
  switch (action.type) {
    case GETONEPOST:
      return action.payload;
    default:
      return state;
  }
}
export default postProfile;

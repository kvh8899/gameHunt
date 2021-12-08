import { csrfFetch } from "./csrf";
import { toggle } from "./postshow";
const GETONEPOST = "post/getonepost";
const getOnePost = (data) => {
  return {
    type: GETONEPOST,
    payload: data,
  };
};
export const getSinglePost = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`);
  const data = await res.json();
  dispatch(getOnePost(data));
  return data;
};
function postProfile(state = {}, action) {
  switch (action.type) {
    case GETONEPOST:
      return action.payload;
    default:
      return state;
  }
}
export const Post = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const cPost = await response.json();
  dispatch(toggle(cPost.id));
  return cPost;
};

export const updatePost = (data,id) => async (dispatch) => {
  await csrfFetch(`/api/posts/${id}/edit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  dispatch(toggle(id));
  return id;
};
export default postProfile;

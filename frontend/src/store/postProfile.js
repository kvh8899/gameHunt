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
  if (res.ok) {
    const data = await res.json();
    dispatch(getOnePost(data));
    return data;
  }
};

export const Post = (data) => async (dispatch) => {
  const res = await csrfFetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    const cPost = await res.json();
    dispatch(toggle(cPost.id));
    return cPost;
  }
};

export const deleteComm = (id, postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}`, { method: "DELETE" });
  if (res.ok) {
    //reload post state
    return dispatch(getSinglePost(postId));
  }
};

export const updateComm = (data, id, postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${id}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return dispatch(getSinglePost(postId));
  }
};

export const updatePost = (data, id) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${id}/edit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    dispatch(toggle(id));
    return id;
  }
};

//data should include userId and the content of the comment
export const postComment = (data, postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if(res.ok){
    await dispatch(getSinglePost(postId));
    return res;
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

const GETPC = "/comments/post";

const postComments = (data) => {
  return {
    type: GETPC,
    payload: data,
  };
};
const getComments = (postId) => async (dispatch) => {
  const comments = await fetch(`/api/posts/${postId}/comments`);
  if (comments.ok) {
    let data = await comments.json();
    dispatch(postComments(data));
    return data;
  }
};
function pCReducer(state = [], action) {
  switch (action.type) {
    case GETPC:
      return action.payload;
    default:
      return state;
  }
}

export default pCReducer;

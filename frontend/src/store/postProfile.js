const GETONEPOST = "post/getonepost";
export const getOnePost = (data) => {
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
      return action.payload
    default:
      return state;
  }
}

export default postProfile;
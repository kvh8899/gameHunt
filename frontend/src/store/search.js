const GETPOST = "search/getpost";

const search = (data) => {
  return {
    type: GETPOST,
    payload: data,
  };
};
export const searchPosts = (input) => async (dispatch) => {
  if(!input){
    await dispatch(search([]));
    return;
  }
  const res = await fetch(`/api/search/posts?input=${input}`);

  if (res.ok) {
    const getPosts = await res.json();
    await dispatch(search(getPosts));
    return getPosts;
  }
};
function searchReducer(state = [], action) {
  switch (action.type) {
    case GETPOST:
      return action.payload;
    default:
      return state;
  }
}

export default searchReducer;

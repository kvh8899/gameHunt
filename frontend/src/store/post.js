const GETPOST = "post/getpost";
export const getPosts = (data) => {
  return {
    type: GETPOST,
    payload: data,
  };
};

//get all posts
export const getPost = () => async (dispatch) => {
  const res = await fetch("/api/posts");
  if (res.ok) {
    const data = await res.json();
    dispatch(getPosts(data));
    return data;
  }
};

const postReducer = (state = [], action) => {
  switch (action.type) {
    case GETPOST:
      return action.payload;
    default:
      return state;
  }
};

export default postReducer;

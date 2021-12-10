import { csrfFetch } from "./csrf";
const GETALL = "comments/getall";
const CREATE = "comments/create"
const getAllComments = (data) => {
    return {
        type:GETALL,
        payload:data
    }
}
//data is a single comment
const postComment = (data,User) => {
    let obj = {
        ...data,User
    }
    return {
        type:CREATE,
        payload:obj
    }
}
//get comments of a post thunk
export const getPostComments = (postId) => async(dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comments`);

    if(res.ok){
        const comments = await res.json();
        dispatch(getAllComments(comments));
    }

}
//create comment thunk
export const createComment = (data,postId) => async(dispatch) =>{
    let obj = {
        userId:data.userId,
        content:data.comment,
        postId
    }
    
    const res = await csrfFetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      if (res.ok) {
        const comment = await res.json();
        dispatch(postComment(comment,data.User));
      }
}

function commentsReducer(state = [], action) {
  switch (action.type) {
    case GETALL:
      return action.payload;
    case CREATE:
        return [...state,action.payload]
    default:
      return state;
  }
}

export default commentsReducer;

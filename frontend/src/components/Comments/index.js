import { useSelector, useDispatch } from "react-redux";
import { deleteComm, updateComm } from "../../store/postProfile";
import { useState, useEffect } from "react";
import { useRef } from "react";
import './Comments.css';
function Comments({ suHidden }) {
  const postShow = useSelector((state) => state.postShow);
  const postProfileData = useSelector((state) => state.postProfile);
  const sessionUser = useSelector((state) => state.session.user);
  const commRef = useRef([]);
  const editRef = useRef([]);
  const pRef = useRef([]);
  const [comments, setComments] = useState("");
  const dispatch = useDispatch();
  if (postShow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  useEffect(() => {
    // fix later. need to filter nulls
    commRef.current = commRef.current.slice(
      0,
      postProfileData[0]?.Comments.length
    );
    editRef.current = editRef.current.slice(
      0,
      postProfileData[0]?.Comments.length
    );
    pRef.current = pRef.current.slice(0, postProfileData[0]?.Comments.length);
  }, [postProfileData]);
  return (
    <div className="commentsContainer">
      <p>Comments {`(${postProfileData[0]?.Comments?.length})`}</p>
      {postProfileData[0]?.Comments?.map((e, i) => {
        return (
          <div key={e.id} className="comment">
            <div>
              <p>{e.User.username}</p>
              <p className="cContent" ref={(el) => (pRef.current[i] = el)}>
                {e.content}
              </p>
              <form
                className="hidden"
                ref={(el) => (editRef.current[i] = el)}
                onSubmit={async (event) => {
                  event.preventDefault();
                  let obj = {
                    userId: sessionUser.id,
                    postId: postProfileData[0]?.id,
                    content: comments,
                  };
                  await dispatch(updateComm(obj, e.id, postProfileData[0]?.id));
                  editRef.current[i].classList.toggle("hidden");
                  pRef.current[i].classList.toggle("hidden");
                }}
              >
                <input
                  value={comments}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  onChange={(e) => {
                    setComments(e.target.value);
                  }}
                ></input>
              </form>
            </div>
            {e.userId === sessionUser?.id ? (
              <div className="menu">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    commRef.current.forEach((event) => {
                      if (event && event.id !== commRef.current[i].id) {
                        event.classList.add("hidden");
                      }
                    });
                    editRef.current.forEach((event) => {
                      if (event && event.id !== commRef.current[i].id) {
                        event.classList.add("hidden");
                      }
                    });
                    pRef.current.forEach((event) => {
                      if (event && event.id !== commRef.current[i].id) {
                        event.classList.remove("hidden");
                      }
                    });
                    commRef.current[i].classList.toggle("hidden");
                  }}
                >
                  <i className="fa fa-ellipsis-h"></i>
                </button>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  ref={(el) => (commRef.current[i] = el)}
                  className="editComment hidden"
                  id={e.id}
                >
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      commRef.current[i].classList.toggle("hidden");
                      editRef.current[i].classList.toggle("hidden");
                      pRef.current[i].classList.toggle("hidden");

                      setComments(e.content);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(event) => {
                      dispatch(deleteComm(e.id, postProfileData[0].id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}
export default Comments;
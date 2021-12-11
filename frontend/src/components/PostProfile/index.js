import "./PostProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { toggle } from "../../store/postshow";
import CommentForm from "./CommentForm";
import MainContent from "./MainContent";
import { deleteComment, updateComment } from "../../store/comments";
import { getSinglePost } from "../../store/postProfile";
function PostProfile({ suHidden }) {
  const postShow = useSelector((state) => state.postShow);
  const postProfileData = useSelector((state) => state.postProfile);
  const postComments = useSelector((state) => state.comments);
  const sessionUser = useSelector((state) => state.session.user);
  const commRef = useRef([]);
  const editRef = useRef([]);
  const pRef = useRef([]);
  const [edit, setEdit] = useState("");
  const dispatch = useDispatch();
  if (postShow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  useEffect(() => {
    commRef.current = commRef.current.slice(0, postComments.length);
    editRef.current = editRef.current.slice(0, postComments.length);
    pRef.current = pRef.current.slice(0, postComments.length);
  }, [postProfileData, postComments.length]);
  return postShow ? (
    <div
        className="darken modal zindex"
        onClick={(e) => {
          /* reset state */
          dispatch(toggle(null));
          dispatch(getSinglePost(null));
        }}
      >
    <div className="profileWrapper">
      
      <button
        className="profExit"
        onClick={(e) => {
          /* reset state */
          dispatch(toggle(null));
          dispatch(getSinglePost(null));
        }}
      >
        X
      </button>
      <div
        className="profileContent"
        onClick={(e) => {
          e.stopPropagation();
          commRef.current.forEach((event) => {
            event?.classList.add("hidden");
          });
          editRef.current.forEach((event) => {
            event?.classList.add("hidden");
          });
          pRef.current.forEach((event) => {
            event?.classList.remove("hidden");
          });
        }}
      >
        {postProfileData.id ? (
          <>
            <div className="profileHeader">
              <img
                className="listImg"
                src={postProfileData.headerImage}
                alt="404 not found"
              ></img>
              <div className="profHeadings">
                <h2>{postProfileData.header}</h2>
                <h3>{postProfileData.subHeader}</h3>
              </div>
            </div>
            <MainContent suHidden={suHidden} />
            <CommentForm suHidden={suHidden} />
            <div className="ss"></div>
            <div className="commentsContainer">
              <p>Comments {`(${postComments.length})`}</p>
              {postComments.map((e, i) => {
                return (
                  <div key={e.id} className="comment">
                    <div>
                      <p>{e.User.username}</p>
                      <p
                        className="cContent"
                        ref={(el) => (pRef.current[i] = el)}
                      >
                        {e.content}
                      </p>
                      <form
                        className="hidden"
                        ref={(el) => (editRef.current[i] = el)}
                        onSubmit={async (submit) => {
                          submit.preventDefault();
                          let obj = {
                            userId: sessionUser.id,
                            postId: postProfileData[0]?.id,
                            content: edit,
                            createdAt: e.createdAt,
                          };
                          await dispatch(
                            updateComment(obj, e.id, {
                              username: sessionUser.username,
                              id: sessionUser.id,
                              email: sessionUser.email,
                            })
                          );
                          editRef.current[i].classList.toggle("hidden");
                          pRef.current[i].classList.toggle("hidden");
                        }}
                      >
                        <input
                          value={edit}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          onChange={(e) => {
                            setEdit(e.target.value);
                          }}
                        ></input>
                      </form>
                    </div>
                    {e.userId === sessionUser?.id ? (
                      <div className="menu">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            /* this closes other comments modals*/
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
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div
                          ref={(el) => (commRef.current[i] = el)}
                          className="editComment hidden"
                          id={e.id}
                        >
                          <button
                            /* close modals when clicking the button*/
                            onClick={(event) => {
                              event.stopPropagation();
                              commRef.current[i].classList.toggle("hidden");
                              editRef.current[i].classList.toggle("hidden");
                              pRef.current[i].classList.toggle("hidden");
                              setEdit(e.content);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={(event) => {
                              dispatch(deleteComment(e.id));
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
          </>
        ) : (
          <div className="fa-3x">
            <i className="fas fa-circle-notch fast-spin"></i>
          </div>
        )}
      </div>
    </div>
    </div>
  ) : (
    ""
  );
}

export default PostProfile;

import "./PostProfile.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../store/postshow";
import { useState, useEffect } from "react";
import { useRef } from "react";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../../store/comments";
function PostProfile({ suHidden }) {
  const postShow = useSelector((state) => state.postShow);
  const postProfileData = useSelector((state) => state.postProfile);
  const postComments = useSelector((state) => state.comments);
  const sessionUser = useSelector((state) => state.session.user);
  const commRef = useRef([]);
  const editRef = useRef([]);
  const pRef = useRef([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const hist = useHistory();
  const dispatch = useDispatch();
  if (postShow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  useEffect(() => {
    commRef.current = commRef.current.slice(
      0,
      postComments.length
    );
    editRef.current = editRef.current.slice(
      0,
      postComments.length
    );
    pRef.current = pRef.current.slice(0, postComments.length);
  }, [postProfileData,postComments.length]);
  return postShow ? (
    <div className="profileWrapper">
      <div
        className="darken modal"
        onClick={(e) => {
          dispatch(toggle(null));
        }}
      ></div>
      <button
        className="profExit"
        onClick={(e) => {
          dispatch(toggle(null));
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
        <div className="mainContent">
          <div className="imgContainer">
            <div className="imageContentWrap">
              <img
                className="imageContent"
                src={postProfileData.contentImage}
                alt="404 not found"
              ></img>
            </div>
            <div className="divider"> </div>
            <p className="description">{postProfileData[0]?.description}</p>
          </div>
          <div className="profData">
            <h3>Maker: {postProfileData?.User?.username}</h3>
            <h3>
              Created:
              {new Date(
                Date.parse(postProfileData.createdAt)
              ).toLocaleDateString("en-US")}
            </h3>
            {sessionUser?.id === postProfileData.userId ? (
              <button
                className="edit"
                onClick={(e) => {
                  if (!sessionUser) {
                    hist.push("/");
                    suHidden.setSuHidden(false);
                  }
                  hist.push(`/posts/${postProfileData.id}/edit`);
                  dispatch(toggle(null));
                }}
              >
                Edit
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="commentsInput fixed">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!sessionUser) {
                suHidden.setSuHidden(false);
                return;
              }
              //post request to make a comment
              await dispatch(
                createComment(
                  {
                    comment,
                    userId: sessionUser.id,
                    User: {
                      username: sessionUser.username,
                      id: sessionUser.id,
                      email: sessionUser.email,
                    },
                  },
                  postProfileData.id
                )
              );
              setComment("");
            }}
          >
            <input
              placeholder="What are your thoughts?"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              required
            ></input>
            <button>Submit</button>
          </form>
        </div>
        <div className="ss"></div>
        <div className="commentsContainer">
          <p>Comments {`(${postComments.length})`}</p>
          {postComments.map((e, i) => {
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
                    onSubmit={async (submit) => {
                      submit.preventDefault();
                      let obj = {
                        userId: sessionUser.id,
                        postId: postProfileData[0]?.id,
                        content: comments,
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
                      /* close modals when clicking the button*/
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
      </div>
    </div>
  ) : (
    ""
  );
}

export default PostProfile;

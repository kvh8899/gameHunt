import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../store/comments";
import {useState} from "react"
function CommentForm({ suHidden }) {
  const sessionUser = useSelector((state) => state.session.user);
  const postProfileData = useSelector((state) => state.postProfile);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  return (
    <div className="commentsInput fixed">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!sessionUser) {
            suHidden.setSuHidden(false);
            return;
          }
          /*post request to make a comment*/
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
  );
}
export default CommentForm;

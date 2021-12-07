import "./CreatePost.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { useSelector, useDispatch } from "react-redux";
import { Post, getSinglePost } from "../../store/postProfile";
function CreatePost() {
  const hist = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [subHeader, setSubHeader] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [contentImage, setContentImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className="postCreate">
      <p>Show off your game to the world!</p>
      <div>
        {errors.length? <ul className="errors">
          {errors.map((e) => (
            <li>{e}</li>
          ))}
        </ul>: ""}
        <form
          className="postCreateForm"
          onSubmit={async (e) => {
            e.preventDefault();
            let obj = {
              userId: sessionUser.id,
              header: title,
              subHeader,
              headerImage,
              contentImage,
              description,
            };
            //use state
            dispatch(Post(obj))
              .then(async (res) => {
                dispatch(getSinglePost(res.id));
                hist.push(`/posts/${res.id}`);
              })
              .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
              });

            //set the post that is showing to the one that is created here
          }}
        >
          <label htmlFor="header">Title</label>
          <input
            type="text"
            name="header"
            id="header"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          ></input>
          <label htmlFor="subHeader">Sub-Header</label>
          <input
            type="text"
            name="subHeader"
            id="subHeader"
            value={subHeader}
            onChange={(e) => {
              setSubHeader(e.target.value);
            }}
            required
          ></input>
          <label htmlFor="headerImage">Cover Image</label>
          <input
            type="text"
            name="headerImage"
            id="headerImage"
            value={headerImage}
            onChange={(e) => {
              setHeaderImage(e.target.value);
            }}
          ></input>
          <label htmlFor="contentImage">Main Image</label>
          <input
            type="text"
            name="contentImage"
            id="contentImage"
            value={contentImage}
            onChange={(e) => {
              setContentImage(e.target.value);
            }}
          ></input>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
          <button>Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;

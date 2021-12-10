import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePost ,updatePost} from "../../store/postProfile";
import { csrfFetch } from "../../store/csrf";
import { getPost } from "../../store/post";
import "./EditPost.css";
function EditPost() {
  const sessionUser = useSelector((state) => state.session.user);
  const param = useParams();
  const dispatch = useDispatch();
  const hist = useHistory();
  useEffect(() => {
    dispatch(getSinglePost(param.editId));
  }, []);
  const data = useSelector((state) => state.postProfile);
  const [title, setTitle] = useState(data.header);
  const [subHeader, setSubHeader] = useState(data.subHeader);
  const [headerImage, setHeaderImage] = useState(data.headerImage);
  const [contentImage, setContentImage] = useState(data.contentImage);
  const [description, setDescription] = useState(data.description);
  const [errors,setErrors] = useState([]);
  return (
    <div className="postCreate">
      <div>
        <p>Edit</p>
        <button
          className="delete"
          onClick={async (e) => {
            await csrfFetch(`/api/posts/${param.editId}`, { method: "DELETE" });
            dispatch(getPost());
            hist.push("/");
          }}
        >
          Remove Post
        </button>
      </div>
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
          dispatch(updatePost(obj,param.editId))
          .then(async (res) => {
            dispatch(getSinglePost(res));
            hist.push(`/posts/${res}`);
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
        }}>
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
        <button>Update</button>
      </form>
    </div>
  );
}

export default EditPost;

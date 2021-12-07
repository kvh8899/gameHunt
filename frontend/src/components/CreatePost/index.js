import "./CreatePost.css";
import {useHistory} from 'react-router-dom'
function CreatePost() {
    const hist = useHistory();
  return (
    <div>
      <form onSubmit={(e) => {
          e.preventDefault();
          hist.push("/");
          //set the post that is showing to the one that is created here
      }}>
        <label htmlFor="header">Title</label>
        <input type="text" name="header" id="header" required></input>
        <label htmlFor="subHeader">Sub-Header</label>
        <input type="text" name="subHeader" id="subHeader" required></input>
        <label htmlFor="headerImage">Cover Image</label>
        <input type="text" name="headerImage" id="headerImage"></input>
        <label htmlFor="contentImage">Main Image</label>
        <input type="text" name="contentImage" id="contentImage"></input>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description"></input>
      </form>
      <button>Create Post</button>
    </div>
  );
}

export default CreatePost;

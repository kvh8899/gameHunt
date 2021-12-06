
function PostContainer({post}){
    return (
        <div id={post.id} className="post" onClick={(e) => {

        }}>
            <img src={post.headerImage} alt="null!"></img>
            <div>
                <div className="header">{post.header}</div>
                <div className="subHeader">{post.subHeader}</div>
            </div>
        </div>
    );
}

export default PostContainer;
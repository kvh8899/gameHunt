
function PostContainer({post}){
    return (
        <div key={post.id} className="post">
            <img src={post.headerImage} alt="null!"></img>
            <div>
                <div className="header">{post.header}</div>
                <div className="subHeader">{post.subHeader}</div>
            </div>
        </div>
    );
}

export default PostContainer;
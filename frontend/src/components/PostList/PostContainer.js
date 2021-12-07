
function PostContainer({post}){
    return (
        <div id={post.id} className="post">
            <img src={post.headerImage} alt="null!" className="listImg"></img>
            <div>
                <div className="header">{post.header}</div>
                <div className="subHeader">{post.subHeader}</div>
            </div>
        </div>
    );
}

export default PostContainer;
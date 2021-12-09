import {useSelector} from 'react-redux'
function PostContainer({post, index}){
    const postList = useSelector((state) => state.posts);
    return (
        <div id={post.id} className="post">
            <img src={postList[index].headerImage} alt="null!" className="listImg"></img>
            <div>
                <div className="header">{postList[index].header}</div>
                <div className="subHeader">{postList[index].subHeader}</div>
                <div className="cCount"><i className="fa fa-comment"></i> {postList[index].Comments.length}</div>
            </div>
        </div>
    );
}

export default PostContainer;
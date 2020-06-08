import React, { Fragment, useEffect } from 'react'
import {connect} from "react-redux"
import {getPost} from "../../action/post"
import Spinner from "../layout/Spinner"
import PostItem from '../posts/PostItem'
import {Link} from "react-router-dom"
import Commentform from "./Commentform"
import CommentItem from "./CommentItem"

const Post = ({getPost, post:{post,loading},match}) => {
    useEffect(()=>{
        getPost(match.params.id)
    },[])
    return loading || post===null ? <Spinner/>:(<Fragment>
        <Link to="/posts" className="btn">
            Back To Posts
        </Link>
        <PostItem post={post} showActions={false}/>
        <Commentform postId={post._id}/>
        <div className="comments">
        {post.comments.map(comment=>(
            <CommentItem postId={post._id} key={comment._id} comment={comment}/>
        ))}
            
        </div>
    </Fragment> )
}

const mapStateToProps=state=>({
    post: state.Post
})

export default connect(mapStateToProps,{getPost})(Post)

import React, { Fragment } from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import Moment from "react-moment"
import {addLikes,removeLikes,deletePost} from "../../action/post"

const PostItem = ({showActions,auth, addLikes, removeLikes, deletePost, post:{text,likes,user,comments,_id,name,avatar,date}}) => {
    
    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to="profile.html">
              <img
                className="round-img"
                src={avatar}
                alt="" />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{text}</p>
             <p className="post-date">
                Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>
            {showActions && <Fragment>
                <button type="button" className="btn btn-light" onClick={e=>addLikes(_id)}>
                <i className="fas fa-thumbs-up"></i>{" "}
                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                </button>
                <button type="button" className="btn btn-light" onClick={e=>removeLikes(_id)}>
                <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion {comments.length>0 && (<span className="comment-count">{comments.length}</span>)}
                </Link>
                {!auth.loading && user===auth.user._id && (
                    <button type="button" className="btn btn-danger" onClick={e=>deletePost(_id)}>
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </Fragment>}
          </div>
        </div>
    )
}

PostItem.defaultProps={
    showActions:true
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps,{addLikes,removeLikes,deletePost})(PostItem)

import {GET_POSTS,GET_POST,GET_ERRORS,UPDATE_LIKES,DELETE_POST,ADD_POST,ADD_COMMENT,REMOVE_COMMENT} from '../action/types'

const intialState={
    post:null,
    posts:[],
    loading:true,
    errors:{}
}

export default function(state=intialState, action){
    const {type,payload}=action
    switch(type){
        case GET_POSTS:
            return {
                ...state,
                posts:payload,
                loading:false
            }
        case GET_POST:
            return {
                ...state,
                post:payload,
                loading:false
            }
        case ADD_POST:
            return {
                ...state,
                posts:[payload,...state.posts],
                loading:false
            }
        case DELETE_POST:
            return {
                ...state,
                posts:state.posts.filter(post=> post._id!==payload),
                loading:false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post:{...state.post, comments:payload},
                loading:false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                post:{
                    ...state.post,
                    comments: state.post.comments.filter(comment=> comment._id!==payload)
                },
                loading:false
            }
        case GET_ERRORS:
            return {
                ...state,
                errors:payload,
                loading:false
            }
        
            case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post=> post._id===payload.id ? {...post, likes:payload.likes}:post),
                loading: false
            }
        default:
            return state
    }
}
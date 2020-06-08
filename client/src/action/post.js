import {GET_POSTS,GET_POST,GET_ERRORS, UPDATE_LIKES, DELETE_POST,ADD_POST, ADD_COMMENT,REMOVE_COMMENT} from './types'
import Axios from 'axios'
import {setAlert} from './alert'

export const getPosts=()=>async dispatch=>{
    try {
        const res= await Axios.get("/api/posts")
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
        
    }
}

export const getPost=postid=>async dispatch=>{
    try {
        const res= await Axios.get(`/api/posts/${postid}`)
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
        
    }
}

export const addLikes=postId=>async dispatch=>{
    try {
        const res= await Axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes:res.data}
        })
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
        
    }
}

export const removeLikes=postId=>async dispatch=>{
    try {
        const res= await Axios.put(`/api/posts/unlike/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes:res.data}
        })
    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
        
    }
}

export const deletePost=postId=>async dispatch=>{
    try {
        await Axios.delete(`/api/posts/${postId}`)
        dispatch({
            type: DELETE_POST,
            payload: postId
        })

        dispatch(setAlert("POST REMOVED","success"))

    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
        
    }
}

export const addPost=formData=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    try {
        
        const res=await Axios.post(`/api/posts`, formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert("POST CREATED","success"))

    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
        
    }
}

export const addComment=(postId,formData)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    try {
        
        const res=await Axios.post(`/api/posts/comment/${postId}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert("COMMENT POSTED","success"))

    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
        
    }
}

export const removeComment=(postId,commentId)=>async dispatch=>{
    try {
        const res=await Axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert("COMMENT REMOVED","success"))

    } catch (error) {
        dispatch({
            type:GET_ERRORS,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
        
    }
}
import {GET_PROFILE,GET_PROFILES,GET_REPOS,PROFILE_ERROR,UPDATE_PROFILE,ACCOUNT_DELETE,CLEAR_PROFILE} from "../action/types"
import Axios from "axios"
import { setAlert } from './alert'

export const getCurrentProfile=()=>async dispatch=>{
    try {
        
        const res=await Axios.get("/api/profile/me")
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
    }
}

export const Createprofile=(formData, history, edit=false) => async dispatch =>{
    try {

        const config={
            headers: {
                "Content-type": "application/json"
            }
        }

        const res=await Axios.post("/api/profile",formData,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

        dispatch(setAlert(edit ? "Profile Updated":"Profile Created","success"))

        if(!edit){
            history.push("/dashboard")
        }

    } catch (error) {
        const errors =error.response.data.errors

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,"danger")))
        }       

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })       
    }
}

export const addExperience=(formData, history) => async dispatch =>{
    try {

        const config={
            headers: {
                "Content-type": "application/json"
            }
        }

        const res=await Axios.put("/api/profile/experience",formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert("Experience Added","success"))

        history.push("/dashboard")

    } catch (error) {
        const errors =error.response.data.errors

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,"danger")))
        }       

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })       
    }
}

export const addEducation=(formData, history) => async dispatch =>{
    try {

        const config={
            headers: {
                "Content-type": "application/json"
            }
        }

        const res=await Axios.put("/api/profile/education",formData,config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert("Education Added","success"))

        history.push("/dashboard")

    } catch (error) {
        const errors =error.response.data.errors

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,"danger")))
        }       

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })       
    }
}

export const deleteExperience = id =>async dispatch=>{
    try {
        const res= await Axios.delete(`/api/profile/experience/${id}`)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Experience Removed"))

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
    }
}

export const deleteEducation = id =>async dispatch=>{
    try {
        const res= await Axios.delete(`/api/profile/education/${id}`)
        
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert("Education Removed"))

    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
    }
}

export const deleteProfile = () => async dispatch=>{
    if(window.confirm("Do you want to delete your account permanently")){
        try {
            await Axios.delete("/api/profile")
            
            dispatchEvent({type:CLEAR_PROFILE})
            dispatch({type:ACCOUNT_DELETE})
    
            dispatch(setAlert("Your Account is Deleted Permanently", "danger"))
    
        } catch (error) {
            dispatch({
                type:PROFILE_ERROR,
                payload: {msg:error.response.statusText, status: error.response.status}
            })
        }
    }
}

export const getProfiles=()=>async dispatch=>{
    dispatch({type:CLEAR_PROFILE})
    try {
        const res=await Axios.get("/api/profile")
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
    }
}

export const getProfileById=userId=>async dispatch=>{
    try {
        const res=await Axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
    }
}

export const getGithubRepos=username=>async dispatch=>{
    try {
        const res=await Axios.get(`/api/profile/github/${username}`)
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
    }
}
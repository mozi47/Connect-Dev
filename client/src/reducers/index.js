import {combineReducers} from "redux"
import Alert from "./Alert"
import auth from "./Auth"
import Profile from "./Profile"
import Post from "./Post" 

export default combineReducers({
    Alert,
    auth,
    Profile,
    Post
})
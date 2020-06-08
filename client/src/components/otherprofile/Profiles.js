import React,{useEffect,Fragment} from 'react'
import {getProfileById} from "../../action/profile"
import {connect} from "react-redux"
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"
import ProfileExperience from "./ProfileExperience"
import ProfileEducation from "./ProfileEducation"
import GithubRepos from "./GithubRepos"

const Profiles = ({ getProfileById, profile: { profile, loading }, auth, match }) => {
    useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
    
    return (
        <Fragment>
            {profile===null || loading ? (<Spinner/>): (<Fragment>
                <Link to="/profiles" className="btn btn-light">Back To Profile</Link>
                {auth.isAuthenticated && auth.loading===false && auth.user._id===profile.user._id && 
                (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)}
            
            <div className="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                    <ProfileAbout profile={profile}/>
                <div class="profile-exp bg-white p-2">
                    <h2 class="text-primary">Experience</h2>
                    {profile.experience.length>0 ? (
                        <Fragment>
                            {profile.experience.map(experience=>(
                                <ProfileExperience key={experience._id} experience={experience}/>
                            ))}
                        </Fragment>
                    ):(<h2>No Experience Credential Found</h2>)}
                </div>
                <div class="profile-edu bg-white p-2">
                    <h2 class="text-primary">Education</h2>
                    {profile.education.length>0 ? (
                        <Fragment>
                            {profile.education.map(education=>(
                                <ProfileEducation key={education._id} education={education}/>
                            ))}
                        </Fragment>
                    ):(<h2>No Education Credential Found</h2>)}
                </div>
                {profile.githubusername &&
                <GithubRepos username={profile.githubusername}/>}
            </div>
        </Fragment>)}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    profile: state.Profile,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getProfileById })(Profiles);
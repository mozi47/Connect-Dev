import React,{useEffect,Fragment} from 'react'
import {connect} from "react-redux"
import {getCurrentProfile} from "../../action/profile"
import Spinner from "../layout/Spinner"
import { Link } from 'react-router-dom'
import DashboardAction from "./DashboardAction"
import Experience from './Experience'
import Education from './Education'
import {deleteProfile} from "../../action/profile"

const Dashboard = ({getCurrentProfile,auth:{user},profile:{profile,loading},deleteProfile}) => {
    
    useEffect(()=>{
        getCurrentProfile()
    },[getCurrentProfile])

    return loading && profile===null ? (<Spinner/>):( 
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead"><i className="fas fa-user"> Welcome {user && user.name} </i></p>
            {profile!==null?
            (<Fragment>
                <DashboardAction/>
                <Experience experience={profile.experience}/>
                <Education education={profile.education}/>
                <div className="my-2">
                    <button className="btn btn-danger" onClick={()=>deleteProfile()}>
                    <i className="fas fa-user-minus">{" "}Delete Account</i>
                    </button>
                </div>
            </Fragment>):
            (<Fragment>
                <p>You have not setup the profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary m-1">Create Profile</Link>
            </Fragment>)}
        </Fragment>

    )
}

const mapStateToProps=state=>({
    auth: state.auth,
    profile: state.Profile
})

export default connect(mapStateToProps,{getCurrentProfile,deleteProfile})(Dashboard)

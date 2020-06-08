import React,{Fragment,useEffect} from 'react'
import {connect} from "react-redux"
import {getProfiles} from "../../action/profile"
import Spinner from "../layout/Spinner"
import ProfileItem from "./ProfileItem"

const Profiles = ({getProfiles, profile:{loading,profiles}}) => {
    useEffect(()=>{
        getProfiles()
    },[getProfiles])
    return(
        <Fragment>
          {loading ? <Spinner/>:<Fragment>
              <h1 className="large text-primary">Developers</h1>
              <p className="lead">
                  <i className="fab fa-connectdevelop">Browse and Connect with Developers</i>
              </p>
              <div className="profiles">
                {profiles.length>0 ? (
                    profiles.map(profile=>(
                        <ProfileItem key={profile._id} profile={profile}/>
                    ))
                ):<h4>No Profile Found...</h4>}
              </div>
          </Fragment>}  
        </Fragment>
    )
}

const mapStateToProps=state=>({
    profile: state.Profile
})

export default connect(mapStateToProps,{getProfiles})(Profiles)

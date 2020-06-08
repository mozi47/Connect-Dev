import React from 'react'
import {connect} from "react-redux"

const Alert = ({alerts}) => {
    //console.log("danger")
    return (
    alerts !==null && 
    alerts.length > 0 && 
    alerts.map(alert=>(
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
)))}
const mapStateToProps=state=>({
    //alert comes from combineReducer (reducer/index.js)
    alerts:state.Alert    
})

export default connect(mapStateToProps)(Alert)

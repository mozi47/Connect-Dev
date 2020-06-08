import React,{Fragment,useState} from 'react'
import {connect} from "react-redux"
import {addEducation} from '../../action/profile'
import {Link,withRouter} from "react-router-dom"

const AddEducation = ({addEducation,history}) => {
    
    const [formData, setformData]=useState({
        school:"",
        degree:"",
        fieldofstudy:"",
        from:"",
        to:"",
        current: false,
        description:""
    })

    const{school,degree,fieldofstudy,to,from,current,description}=formData
    const [toToggle,settoToggle]=useState(false)

    const onChange=e=>{
        setformData({...formData, [e.target.name]:e.target.value})
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
       Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any School or Program that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>{ 
          e.preventDefault()
          addEducation(formData,history)
          }}>
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name="school" required value={school} onChange={e=>onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree or Certificate" name="degree" required value={degree} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e=>onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value={current} 
          onChange={e=>{
              setformData({...formData, current:!current})
              settoToggle(!toToggle)
          }}/> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" disabled={toToggle?"disabled":""} value={to} onChange={e=>onChange(e)}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description} onChange={e=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

export default connect(null,{addEducation})(withRouter(AddEducation))

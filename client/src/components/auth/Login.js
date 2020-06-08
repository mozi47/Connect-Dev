import React,{Fragment,useState} from 'react'
import {Link,Redirect} from "react-router-dom"
import {login} from "../../action/auth"
import {connect} from "react-redux"

const Login = ({login, isAuthenticated}) => {
    const[formData,setformData]=useState({
        email:"",
        password:""
    })

    const {email,password}=formData

    const onChange=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmit=async (e)=>{
        e.preventDefault()
        login(email,password)
    }

    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }

    return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={e=>onChange(e)}
          name="email" />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>onChange(e)}
            minLength="6"
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
    )
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)

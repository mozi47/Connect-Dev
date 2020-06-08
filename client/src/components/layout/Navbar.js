import React, { Fragment } from 'react'
import {Link} from "react-router-dom"
import {logout} from "../../action/auth"
import {connect} from "react-redux"

const Navbar = ({auth:{isAuthenticated, loading},logout}) => {
  const authlinks=(
    <ul>        
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/dashboard"><i className="fas fa-user">{' '} <span className="hide-sm">Dashboard</span></i></Link></li>
        <li>
        <a onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt">{" "}
        <span className="hide-sm">Logout</span>
        </i></a></li>
    </ul>
  )

  const guestlinks=(
    <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>
  )
  
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {!loading && <Fragment>{isAuthenticated?authlinks:guestlinks}</Fragment>}
    </nav>
    )
}

const mapStateToProps = state =>({
  auth: state.auth
})

export default connect(mapStateToProps,{logout})(Navbar)

import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import { Fragment, useState } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {loginUserr} from '../../actions/auth'
import {setAlert} from '../../actions/alert';
import Alert from '../layout/Alert.js'
import { logout } from '../../actions/auth'

export const Login = ({setAlert, loginUserr, auth: {isAuthenticated, loading}, logout}) => {

    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="forums.html">Forums</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="profiles.html">Find a Tutor</a>
            </li>
            <li className="nav-item">
                <a onClick={logout} className="nav-link" href="#!">Become a Tutor</a>
            </li>
            <li className="nav-item">
                <a onClick={logout} className="nav-link" href="#!">Logout</a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="forums.html">Login</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="profiles.html">Register</a>
            </li>
        </ul>
    )

    const [formData, setFormData] = useState({
        email: '',
        password:''
    });
    const {email, password} = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    const onSubmit = async e => {
        e.preventDefault()

        loginUserr({email,password})
    }

    //Redirect if logged in
    if(isAuthenticated){
        return <Navigate to='/forums' />
    }

    return (
        <Fragment>
    <div className='container1'>
        <div className='navigation-section'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href=""><img src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/000000/external-lightbulb-electronic-devices-kmg-design-outline-color-kmg-design.png"/></a>
                <div className="" id="navbarText">
                <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="login">Login</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="register">Register</a>
            </li>
        </ul>
                </div>
            </nav>
        </div>
    </div>
    <Alert />
    <section className="container5">
        <h1 className="title">
            Welcome Back!
        </h1>
        <p className="lead"><i className='fas fa-user'></i>  <u>Login in to begin</u>!
        </p>
        <form action="dashboard.html" className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
              type="email" 
              placeholder="Email Address"
              name='email'
              value={email}
              onChange={e=>onChange(e)} 
              required/>
            </div>
            <div className="form-group">
              <input 
              type="password" 
              placeholder="Password" 
              minlength="6"
              name='password'
              value={password}
              onChange={e=>onChange(e)}
              required />
            </div>
            <input type="submit" value="Login" className="btn2 btn-primary" />
          </form>
          <p className="text">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
    </section>
    </Fragment>
    )
}

Login.propTypes = {
    loginUserr: PropTypes.func,
    setAlert: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})

export default connect(mapStateToProps, {loginUserr, setAlert, logout})(Login)
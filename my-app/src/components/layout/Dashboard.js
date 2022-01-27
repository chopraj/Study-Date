import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Spinner from './Spinner'
import {getCurrentProfile, deleteAccount} from '../../actions/profile'
import { logout } from '../../actions/auth'

export const Dashboard = ({getCurrentProfile, deleteAccount, auth: {user}, profile: {profile, loading}, logout}) => {
    useEffect(() => {getCurrentProfile()}, [])


    return loading && profile === null ? <Spinner /> : <Fragment>
    <div className='container1'>
        <div className='navigation-section'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="#"><img src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/000000/external-lightbulb-electronic-devices-kmg-design-outline-color-kmg-design.png"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <i className="text-white fa fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/forums">Forums</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/tutor-profiles">Find a Tutor</a>
                    </li>
                    <li className="nav-item">
                        <a  className="nav-link" href="/dashboard">Become a Tutor</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={logout} className="nav-link" href="/login">Logout</a>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    </div>
    <section className='container5'>
        <h1 className="title">
            Dashboard
        </h1>
        <p className="lead"><i className='fas fa-user'></i> <u>Welcome {user && user.name}</u>
        </p>
        {profile != null ? <Fragment>
            <p className='medium'>You already have a Tutor profile in our system, click below to edit it </p>
            <Link to='/edit-tutor-profile' className='btn2'>Edit Profile</Link>
            <a href='/login'><button className='badbtn' onClick={() => deleteAccount()}>
                Delete Account
            </button></a>
        </Fragment> : 
        <Fragment>
            <p className='medium'>You haven't  set up a Tutor profile yet, please create one to get started</p>
            <Link to='/create-tutor-profile' className='btn2'>Create Profile</Link>
            <a href='/login'><button className='badbtn' onClick={() => deleteAccount()}>
                Delete Account
            </button></a>
        </Fragment>}
  </section>

    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func, 
    deleteAccount: PropTypes.func,
    auth: PropTypes.object.isRequired, 
    profile: PropTypes.object.isRequired, 
    logout: PropTypes.func
}

const mapStateToProps = state => ({
    auth: state.auth, 
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount, logout})(Dashboard) 
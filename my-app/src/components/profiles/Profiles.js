import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import {getProfiles} from '../../actions/profile'
import ProfileItem from './ProfileItem'
import { logout } from '../../actions/auth'

const Profiles = ({logout, getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles()
    }, [])

    return <Fragment>
        <div className='container1'>
        <div className='navigation-section'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href=""><img src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/000000/external-lightbulb-electronic-devices-kmg-design-outline-color-kmg-design.png"/></a>
                <div className="" id="navbarText">
                <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="/forums">Forums</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/tutor-profiles">Find a Tutor</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/dashboard">Become a Tutor</a>
            </li>
            <li className="nav-item">
                <a onClick={logout} href='/login' className="nav-link">Logout</a>
            </li>
        </ul>
                </div>
            </nav>
        </div>
    </div>
        { loading ? <Spinner/> : <Fragment>
        <section class='container5'>
            <h1 class="title">
            Meet the Study Date Tutors!
            </h1>
            <p class="lead"><i class='fab fa-connectdevelop'></i>  <u>Browse and connect with tutors to get the help you need</u>!
            </p> 
            <div class="profiles">
                {profiles.length > 0 ? (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ):<Fragment><h4>No Tutor Profiles found</h4></Fragment>}
            </div>
        </section>
        </Fragment> }
    </Fragment> 
}

Profiles.propTypes = {
getProfiles: PropTypes.func.isRequired,
logout: PropTypes.func,
profile: PropTypes.object,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles, logout})(Profiles)

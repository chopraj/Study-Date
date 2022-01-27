import React, {Fragment, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createProfile, getCurrentProfile} from '../../actions/profile'
import { logout } from '../../actions/auth'
import Alert from '../layout/Alert.js'


const CreateProfile = ({createProfile, logout}) => {
    const [formData, setFormData] = useState({
        school: '',
        hourlyrate: '',
        skills: '',
        contact_email: '',
        bio: ''
    })

    const navigate = useNavigate()
    const { 
        school, hourlyrate, skills, contact_email, bio
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        createProfile(formData, navigate)
    }

    return (
        <Fragment>
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
                        <a  className="nav-link" href='/dashboard'>Become a Tutor</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={logout} className="nav-link" href="/login">Logout</a>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    </div>

<Alert/>
            <section className='container5'>
        <h1 className="title">
            Create your profile
        </h1>
        <p className="lead"><i className='fas fa-user'></i>  <u> Lets get some information to make your profile stand out</u>!</p>   
        <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input value={skills} onChange={e=> onChange(e)} type="text" placeholder="Skills" name="skills" />
                    <small className="form-text">Please use comma separated values (eg.
                      AP Physics,Economics,JavaScript,etc)</small>
                </div>
                <div className="form-group">
                    <input value={school} onChange={e=> onChange(e)} type="text" placeholder="School or Company" name="school" />
                </div>
                <div className="form-group">
                    <input value={hourlyrate} onChange={e=> onChange(e)} type="text" placeholder="Hourly Rate" name="hourlyrate" />
                    <small className="form-text"></small>
                </div>
                <div className="form-group">
                    <input value={contact_email} onChange={e=> onChange(e)} type="email" placeholder="Contact Email" name="contact_email" />
                    <small className="form-text">This is the email students will use to get in contact with you</small>
                </div>
                <div className="form-group">
                    <input value={bio} onChange={e=> onChange(e)} maxlength='200' type="text" placeholder="Bio" name="bio" />
                    <small className="form-text">Tell us a little about yourself!</small>
                </div>
                <input type="submit" value="Save Profile" className="btn2 btn-primary" />
                <a href='/dashboard'><input type="button" value="Go Back" className="btn2 btn-primary" /></a>

        </form>
  </section>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    logout: PropTypes.func
}

export default connect(null, {createProfile, logout})(CreateProfile)

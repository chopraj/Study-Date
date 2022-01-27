import React, {Fragment, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert.js'

export const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        tutor: '',
        name: '',
        email: '',
        password:''
    });
    const {tutor, name, email, password} = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    const [Tutor,setTutor]= useState(true)
    const onSumbit = async e => {
        e.preventDefault()
        register({name, email, password})        
    }

    if(isAuthenticated){
        return <Navigate to='/forums'/>
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
            Hello There!
        </h1>
        <p className="lead"><i className='fas fa-user'></i>  <u>Register to get started!</u>!
        </p>
        <form className="form" onSubmit={e => onSumbit(e)}>
            <div className="form-group">
                <input 
                type="name" 
                placeholder="Full Name" 
                name='name'
                value={name}
                onChange = {e => onChange(e)}
                />
              </div>
            <div className="form-group">
              <input 
              type="email" 
              placeholder="Email Address" 
              name='email'
              value={email}
              onChange = {e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input 
              type="password" 
              placeholder="Password" 
              minLength="6"
              name='password'
              value={password}
              onChange = {e => onChange(e)}
              />
            </div>
            
            <input type="submit" value="Register" className="btn2 btn-primary" />
          </form>
          <p className="text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
    </section>
    </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);
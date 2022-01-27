import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Route, Navigate} from 'react-router-dom'
import auth from '../../reducers/auth'

export const PrivateRoute = ({children, auth: {isAuthenticated, loading}}) => {
    const authed = isAuthenticated && !loading


    return authed ? children: <Navigate to='/login'/>
}



PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)

import axios from 'axios'
import {setAlert} from './alert'
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, ACCOUNT_DELETED, LOGOUT, GET_PROFILES } from './constants'
import { logout } from './auth'

// Get Current User's Profile 
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/profile/me')

        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
// Create or Update Profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('api/profile', formData, config)

        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        })

        dispatch(setAlert((edit ? 'Profile Updated': 'Profile Created'),'succ'))

    } catch (err) {
        console.log('error')
            const errors = err.response.data.errors; 

            if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'fail')))
        }

        dispatch({
            type: PROFILE_ERROR, 
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
// Get all Profiles

export const getProfiles = () => async dispatch => {
    // dispatch({type:CLEAR_PROFILE})
    try {
        const res = await axios.get('api/profile')

        dispatch({
            type: GET_PROFILES, 
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get profile by id

export const getProfileById = userId => async dispatch => {

    try {
        const res = await axios.get(`api/profile/user/${userId}`)

        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR, 
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Delete Account
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete your account? This CANNOT be undone')) {
        try {
            const res = await axios.delete('/api/profile')

            dispatch({type: CLEAR_PROFILE})
            dispatch({type: ACCOUNT_DELETED})
            dispatch({type: LOGOUT})
            dispatch(setAlert('Your account has been deleted', 'fail'))
            


        } catch (err) {
            dispatch({
                type: PROFILE_ERROR, 
                payload: {msg:err.response.statusText, status:err.reponse.status}
            })
        }
    }
}
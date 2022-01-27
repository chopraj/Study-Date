import axios from 'axios';
import api from '../utils/api';
import api2 from '../utils/api2';
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE} from './constants';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken'
// Load User 
export const loadUser = (token) => async (dispatch) => {
    let x = token['token']
    console.log(x)
    const config = {
        headers: {
            'x-auth-token': `${x}`
        }
    }
    try {
      const res = await api2.get('/auth', config);
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
}
// Load User String
export const loadUserStr = (token) => async (dispatch) => {
    const config = {
        headers: {
            'x-auth-token': `${token}`
        }
    }
    try {
      const res = await api2.get('/auth', config);
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
}
// Register User
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password})

    try {
        const res = await api.post('/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser(res.data))
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'fail')))
            dispatch({
                type: REGISTER_FAIL
            }) 
            };
        }
}

// Login User
export const loginUserr = ({email, password}) => async dispatch => {
    const config2 = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body2 = JSON.stringify({email, password})

    try {
        const res = await axios.post('api/auth', body2, config2)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        
        dispatch(loadUser(res.data))

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'fail')))
            dispatch({
                type: LOGIN_FAIL
            }) 
            };
        }
}

// LogOut / Clear Profile

export const logout = () => dispatch => {
    dispatch({type:CLEAR_PROFILE})
    dispatch({type:LOGOUT})
    
}
import axios from 'axios';
import { loadUser } from '../actions/auth';
const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;
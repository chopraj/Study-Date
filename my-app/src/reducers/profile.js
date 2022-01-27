import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, LOGOUT, GET_PROFILES} from "../actions/constants";
const initialState = {
    profile: null, 
    profiles: [],
    loading: true, 
    error: {}
}

export default function(state = initialState, action){
    const { type, payload} = action; 
    switch(type){
        case GET_PROFILE: 
            return {
                ...state, 
                profile: payload, 
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state, 
                profiles: payload, 
                loading: false
            }
        case PROFILE_ERROR: 
            return {
                ...state, 
                error: payload, 
                loading: false
            }
        case CLEAR_PROFILE:
        case LOGOUT: 
            return {
                ...state,
                profile: null, 
                loading: false
            }
        default: 
            return state;
    }

}
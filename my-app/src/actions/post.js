import axios from 'axios'
import { setAlert } from './alert'
import {
    ADD_POST,
    DELETE_POST,
    GET_POSTS, 
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES, 
    REMOVE_COMMENT, 
    ADD_COMMENT
} from './constants'
import api from '../utils/api';


// Get Posts 
export const getPosts = (token) => async dispatch => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    }
    try {
        const res = await api.get('/post',config)

        dispatch({
            type: GET_POSTS, 
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
// Add Like 
export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`api/post/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id, likes: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: {msg:err.response.statusText, status: err.response.status}
        })
        
    }
}
// Remove Like 
export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`api/post/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id, likes: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: {msg:err.response.statusText, status: err.response.status}
        })
        
    }
}
// Delete Post 
export const deletePost = (id) => async dispatch => {
    
    try {
        const res = await axios.delete(`api/post/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert('Post Removed'), 'succ')
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: {msg:err.response.statusText, status: err.response.status}
        })
        
    }
}
// Add Post
export const addPost = (formData, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`
        }
    }

    try {
        const res = await axios.post('api/post', formData, config)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post Created'), 'succ')
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: {msg:err.response.statusText, status: err.response.status}
        })
        
    }
}
// Get Post
export const getPost = (id) => async (dispatch) => {
    try {
      const res = await api.get(`/post/${id}`);
  
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
// Add Comment
export const addComment = (postId, formData, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${token}`
        }
    }

    try {
        const res = await api.post(`/post/comment/${postId}`, formData, config)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment Added'), 'succ')
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: {msg:err.response.statusText, status: err.response.status}
        })
        
    }
}
// Delete Comment
export const deleteComment = (postId, commentId, token) => async dispatch => {
    const config = {
        headers: {
            'x-auth-token': `${token}`
        }
    }
    try {
        const res = await api.delete(`/post/comment/${postId}/${commentId}`, config)

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment Removed'), 'succ')
    } catch (err) {
        dispatch({
            type: POST_ERROR, 
            payload: {msg:err.response.statusText, status: err.response.status}
        })
        
    }
}
import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import {addLike, removeLike, deletePost} from '../../actions/post'

const PostItem = ({addLike, removeLike, deletePost, auth, post:{_id, text, user, name, avatar, likes,comments, date },showActions}) => 
    <div className="post">
        <div className='post-child'>
            <img src={avatar} alt="" className="round-img post-img"/>
            <h4 className='post-username'>{name}</h4>
            </div>
            <div>
            <p className="hola">
             {text}
            </p>
            <p className='post-date'>Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>

            {showActions && (<Fragment>
                <button onClick={e => addLike(_id)} className="goodbtn">
                <i className="fas fa-thumbs-up"></i> <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button onClick={e => removeLike(_id)} className="badbtn">
                <i className="fas fa-thumbs-down"></i>   
            </button>
            <a href={`/forums/${_id}`} className="btn3 discussionbtn">Discussion</a>
            {!auth.loading && user === auth.user._id && (
            <button onClick={e => deletePost(_id)} type="button" className="deletebtn">
                <i className="fas fa-times" />
            </button>)}
                </Fragment>)}
            </div>
        </div>
PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
post: PropTypes.object,
auth: PropTypes.object,
addLike: PropTypes.func.isRequired,
deletePost: PropTypes.func.isRequired,
removeLike: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{addLike, removeLike, deletePost})(PostItem)

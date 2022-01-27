import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteComment} from '../../actions/post'; 
import Alert from '../layout/Alert'

const CommentItem = ({deleteComment, postId, auth, comment:{_id, text, name, avatar,user,date}}) => {
  return (
  
    <div className="post">
            <div className='post-child'>
                <img src={avatar} alt="" className="round-img"/>
                <h4>{name}</h4>
            </div>
            <div>
            <p className="hola">
                {text}
            </p>
            <p className="post-date">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>
            {!auth.loading && user === auth.user._id && (
                <button className="deletebtn deletebtn-buffer" type='button' onClick={e => deleteComment(postId, _id, auth.token)}>
                        <i className="fas fa-times" />
                </button>
            )}
            </div>
        </div>

  )};

CommentItem.propTypes = {
    postid: PropTypes.number, 
    comment: PropTypes.object,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps,{deleteComment})(CommentItem);

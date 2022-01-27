import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import {logout} from '../../actions/auth'
import Moment from 'react-moment'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import Alert from '../layout/Alert'

const Post = ({logout, getPost, post: {post, loading}, auth}) => {
    const {id} = useParams()
    useEffect(() => {
        getPost(id)
    }, [getPost,id])

    return loading || post === null ? (<Spinner/> ): (<Fragment>
<div>
    <div className='container1'>
        <div className='navigation-section'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href=""><img src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/000000/external-lightbulb-electronic-devices-kmg-design-outline-color-kmg-design.png"/></a>
                <div className="" id="navbarText">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/forums">Forums</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/tutor-profiles">Find a Tutor</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">Become a Tutor</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={logout} href="/login" className="nav-link">Logout</a>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    </div>
</div>
<Alert/>
<section className='container3'>
    <a href="/forums" className="btn2">Back To Posts</a>
    <PostItem post={post} showActions={false}/>
    <CommentForm postId={post._id}/>
    <div className="posts">
    {post.comments.map(comment => (
      <CommentItem auth={auth} key={comment._id} comment={comment} postId={post._id}/>
  ))}
</div>
  </section>
    </Fragment>
    )}

  
    
Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object,
    auth: PropTypes.object, 
    logout: PropTypes.func
}
const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})
export default connect(mapStateToProps,{getPost, logout})(Post)

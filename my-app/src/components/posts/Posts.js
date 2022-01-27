import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import { logout } from '../../actions/auth'
import PostItem from './PostItem'
import Alert from '../layout/Alert'


import { addPost } from '../../actions/post'

const Posts = ({logout, auth:{token},addPost, getPosts, post: {posts,loading}}) => {
    useEffect(() => {getPosts(token)}, [getPosts])
    const [text, setText] = useState('')
    return loading ? <Spinner/> : (<Fragment>
        <div className='container1'>
        <div className='navigation-section'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand coloring" href="#"><img src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/000000/external-lightbulb-electronic-devices-kmg-design-outline-color-kmg-design.png"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <i className="text-white fa fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/forums">Forums</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/tutor-profiles">Find a Tutor</a>
                    </li>
                    <li className="nav-item">
                        <a  className="nav-link" href="/dashboard">Become a Tutor</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={logout} className="nav-link" href="/login">Logout</a>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    </div>
    <Alert/>
    <section className='container5'>
        <h1 className="title">
            Forums
        </h1>
        <p className="lead"><i className='fas fa-user'></i> <u>Welcome to our community! Ask any question about any subject and our team of tutors will get back to you ASAP</u>.
        </p>
        <div className="post-form">
            <div className="post-form-header">
                <h3>Ask something...</h3>
            </div>
            <form onSubmit={e => {
                e.preventDefault()
                addPost({text}, token)
                setText('')
                }} className="hola">
                <textarea onChange={e => setText(e.target.value)} value={text} name="text" id="textarea" cols="30" rows="5" placeholder="Create a post"></textarea>
                <input type="submit" value='Submit' className='viewprofilebtn ooga'/>
            </form>
            <div className="posts">
                 {posts.map((postss) => (
                     <PostItem key={postss._id} post={postss}/>
                 ))}

            </div>
        </div>
  </section>
    </Fragment>)
        
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    logout: PropTypes.func,
    post: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post, 
    auth: state.auth
})

export default connect(mapStateToProps, {getPosts, addPost, logout})(Posts)
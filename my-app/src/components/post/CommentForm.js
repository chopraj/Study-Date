import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';


const CommentForm = ({postId,addComment, auth:{token}}) => {
    const [text,setText] = useState('')
  return (
<Fragment> 
    <div className="post-form">
    <div className="post-form-header">
      <h3>Leave a Comment...</h3>
    </div>
    <form onSubmit={e=>{
        e.preventDefault()
        addComment(postId,{text}, token)
        setText('')
    }} className="form">
      <textarea id="textarea"
        name="text"
        value={text}
        cols="30"
        rows="5"
        onChange={e=>setText(e.target.value)}
        placeholder="Comment on this post"
        required
      ></textarea>
      <input type="submit" className="btn2 hola" value="Submit" />
    </form>
  </div>
  
</Fragment>
  )
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {addComment})(CommentForm);

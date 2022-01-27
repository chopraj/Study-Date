const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const auth = require('../../middlewear/auth');
const checkObjectId = require('../../middlewear/checkObjectId');

// Create Post
router.post('/', [auth,[
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try{
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text, 
            name: user.name, 
            avatar: user.avatar, 
            user: req.user.id
        });

        const post = await newPost.save()
        res.json(post)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});
// Get Post
router.get('/', auth,async (req, res) => {
    try{ // Get posts in chronological order 
        const posts = await Post.find().sort({ date: -1})
        res.json(posts)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});
// Get Post by id
router.get('/:id', checkObjectId('id'), async (req, res) => {
    try{ // Get posts in chronological order 
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({msg:"Post not found"})
        }
        res.json(post)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')}
});
// Delete Post
router.delete('/:id', auth, async (req, res) => {
    try{ 
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:"Post not found"})
        }
        // Check if user is owner of post
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: "User not authorized for this action"})
        }
        await post.remove()
        res.json({msg: "Post sucessfully removed"})
    }catch(err){
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(404).json({msg:"Post not found"})
        }
        res.status(500).send('Server Error')
    }
})
// Liking a post
router.put('/like/:id', auth, async (req, res) => {
    try{ 
        const post = await Post.findById(req.params.id); 
        // Check if post has already been liked by user 
        if(post.likes.filter(like => like.user.toString() == req.user.id).length>0){
            return res.status(400).json({msg:"This post has already been liked by you"})
        }
        post.likes.unshift({user: req.user.id})
        await post.save(); 
        res.json(post.likes)
    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});
// Unliking a Post 
router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has not yet been liked
      if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // remove the like
      post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.user.id
      );
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
//Add comment to post 
router.post(
    '/comment/:id',
    auth,
    checkObjectId('id'),
    check('text', 'Text is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
  
        const newComment = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
  
        post.comments.unshift(newComment);
  
        await post.save();
  
        res.json(post.comments);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
// Remove a comment 
router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        // Check if comment exists
        if(!comment){
            return res.status(404).json({msg:"Comment doesn't exist"})
        }

        // Check user authority 
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg:"You do not have the authority to delete this comment"})
        }

        // Get remove index 
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1)
        await post.save()
        res.json(post.comments)

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router;
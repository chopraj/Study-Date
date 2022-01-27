const express = require('express');
const router = express.Router();
const auth = require('../../middlewear/auth');
const config = require('config');
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
router.get('/', auth,async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// Validate User
router.post('/', [
    // check('email', 'Please enter a valid email').isEmail,
    check('password','Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    };

    const {email, password} = req.body;

    try {
    // Check if doens't exist
    let user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({ errors: [{msg: 'Invald User Credentials'}]});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) {
        return res.status(400).json({ errors: [{msg: 'Invald User Credentials'}]});
    }


    const payload = {
        user : {
            id: user.id
        }
    }
    jwt.sign(
        payload, 
        config.get('jwtSecret'), 
        {expiresIn: 36000}, 
        (err,token) => {
            if(err) throw err;
            res.json({token});
        });
    

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
})



module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../../middlewear/auth');
const {check, validationResult} = require('express-validator/check');
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// Get profile of logged in user 
router.get('/me', auth, async (req, res) => {
    try { 
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name', 'avatar']);

        if (!profile){
            return res.status(400).json({msg:"Sorry, there is no profile for this user"})
        }

        res.json(profile);
    } catch(err){ 
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});

// Create User Profile 
router.post('/', [auth], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {school, skills, hourlyrate, contact_email, bio, date} = req.body;

    // Build Profile Object 
    const profileFields = {};
    profileFields.user = req.user.id; 
    if (school) {
        profileFields.school = school
    }
    if (bio) {
        profileFields.bio = bio
    }
    if (hourlyrate) {
        profileFields.hourlyrate = hourlyrate
    }
    if (contact_email) {
        profileFields.contact_email = contact_email
    }
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    
    try { 
        let profile = await Profile.findOne({user: req.user.id})

        if (profile){ // Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id},{$set: profileFields},{new: true});
            return res.json(profile)
        }
        

        // Create 
        profile = new Profile(profileFields)
        await profile.save();
        res.json(profile)

    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    } 
});

// Get all profiles 
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// Get profile by user id
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user', ['name', 'avatar'])
        if(!profile) return res.status(400).json({msg:"Profile not found"})
        res.json(profile)
    } catch(err){
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg:"Profile not found"})
        }
        res.status(500).send('Server Error')
    }
}); 
// Delete profile, user, and posts 
router.delete('/',auth, async (req, res) => {
    try {
        // Remove user's posts 
        // Remove Profile
        await Profile.findOneAndRemove({user: req.user.id});
        // Remove user
        await User.findOneAndRemove({_id: req.user.id})

        res.json({msg:"User deleted"})
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})
module.exports = router;
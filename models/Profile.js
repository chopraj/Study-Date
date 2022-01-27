const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }, 
    bio:{
        type: String
    },
    school: {
        type: String
    }, 
    hourlyrate: {
        type: String
    }, 
    skills: {
        type: [String]
    }, 
    contact_email:{
        type: String
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('Profile', ProfileSchema);
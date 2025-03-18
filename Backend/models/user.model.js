const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName:{type:String},
    age:{type:String},
    email:{type:String},
    address:{type:String},
    password:{type:String},
})

module.exports = mongoose.model('User', UserSchema)
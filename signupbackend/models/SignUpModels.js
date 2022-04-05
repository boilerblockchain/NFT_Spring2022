const mongoose = require('mongoose')

//user schema 
const signUpTemplate = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now // function that is called upon user creation NOT PASSED
    }
})

module.exports = mongoose.model('mytable', signUpTemplate)
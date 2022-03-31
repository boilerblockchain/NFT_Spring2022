const express = require('express')
const router = express.Router()
const signUpTemplatesCopy = require('../models/SignUpModels')
 
// post request that creates a new user schema
router.post('/signup', (request, response) => {
    // creates a new schema with user info
    const signedUpUser = new signUpTemplatesCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:request.body.password
    })
    signedUpUser.save()
    .then(data =>{
        response.json(data) // create user json if saves succesfully
    })
    .catch (error => {
        response.json(error) //catch error and send it as json
    })
})

module.exports = router 
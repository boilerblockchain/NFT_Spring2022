const express = require('express')
const router = express.Router()
const signUpTemplatesCopy = require('../models/SignUpModels')
const bcrypt = require('bcrypt') // used to encrypt password
 
// post request that creates a new user schema
router.post('/signup', async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10) // cryptography hash & salt
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    // creates a new schema with user info
    const signedUpUser = new signUpTemplatesCopy({
        fullName:request.body.fullName,
        username:request.body.username,
        email:request.body.email,
        password:securePassword
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
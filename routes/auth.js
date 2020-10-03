const express = require('express')
const router = express.Router()


const {signup, signin , signout , forgotPassword,resetPassword} = require('../controllers/auth');
const {userSignupValidator,userSigninValidator} = require("../validator")

router.post('/signup', userSignupValidator, signup );
router.post('/signin', userSigninValidator, signin );
router.get('/signout',  signout );
router.put('/forgot-password', forgotPassword)
router.put('/reset-password/', resetPassword)




module.exports = router;
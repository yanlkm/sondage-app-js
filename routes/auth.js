const express = require('express')
const passport = require('passport')
const router = express.Router()
const auth = require('../controller/auth.controller')
const jwt = require('jsonwebtoken')



//@description Classic Auth 
//@route /auth/classicauth 
router.post('/signup',auth.singUp)

//Login
router.post("/login", auth.signIn)

router.post("/login/google", auth.signInGoogle); 


//@description Google Auth
//@route /auth/google
// router.get('/google', passport.authenticate('google', {scope : ['profile']}))



//@description Google Auth Callback
//@route /auth/google/callback


// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//   const googleId = req.user.googleId;
//   const token = auth.createToken(false, googleId);
//   res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
//   res.status(201).json({ success: true, redirectUrl: "dashboard" });
// });

router.get('/logout', auth.logOut);

module.exports = router;
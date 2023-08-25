const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middlewares/auth.google')

//@description Login/Landing Page
//@route /

router.get('/', ensureGuest
// ,(req, res) => {

//     res.render('login',{
//         layout: 'login'
//     })
// }
)

//@description /Dashboard
//@route /Dashboard

router.get('/dashboard', ensureAuth
// (req, res) => {
    
//     // res.render('dashboard', {
//     //     name : req.user.displayName
//     // })
// }
)

module.exports = router
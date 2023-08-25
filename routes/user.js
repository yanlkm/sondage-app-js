const express = require("express");
const router = express.Router();
const user = require('../controller/user.controller')
const role = require('../middlewares/user.role')
const upload = require('../controller/upload.controller')


//CRUD 
//Get user(s)
router.get("/", user.getAllUsers);
router.get('/:id', role.checkAdminRole, user.getOneUser);
router.post('/update', role.checkAdminRole, user.updateUser)

//PHOTO PROFIL 
router.post('/upload',role.checkAdminRole,upload.uploadProfile )


module.exports = router;


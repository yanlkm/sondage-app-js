const express = require("express");
const router = express.Router();
const factory = require('../controller/factory.controller')
const role = require('../middlewares/user.role')
const userCooked = require('../middlewares/user.cookie')
const upload = require('../controller/upload-fac.controller')

//CRUD 
router.get('/', factory.getAll); 
router.get('/:id',factory.getOne); 

router.post('/create', role.checkAdminRole,factory.createOne); 
router.put('/update/:id',role.checkAdminRole, factory.updateOne); 
router.delete('/delete/:id',role.checkAdminRole, factory.deleteOne); 


//actions on etablishment
router.patch('/like/:id', userCooked.getUserIdbyCookie, factory.likeOne); 
router.patch('/dislike/:id',userCooked.getUserIdbyCookie, factory.dislikeOne); 
router.patch('/follow/:id',userCooked.getUserIdbyCookie, factory.followOne); 
router.patch('/unfollow/:id',userCooked.getUserIdbyCookie, factory.unfollowOne);

//actions on post
router.post('/comment/:id', userCooked.getUserIdbyCookie, factory.commentOne);
router.delete('/deletecomment/:idfactory/:idcomment', userCooked.getUserIdbyCookie, factory.deleteComment);
router.patch('/likecomment/:idfactory/:idcomment', userCooked.getUserIdbyCookie, factory.likeComment)
router.patch('/dislikecomment/:idfactory/:idcomment', userCooked.getUserIdbyCookie, factory.dislikeComment)

//profil pic 
router.post('/upload/:id',role.checkAdminRole,upload.uploadFactory )


module.exports = router



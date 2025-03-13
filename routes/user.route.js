const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller');
const isLogin=require('../middlewares/auth.middleware');


//user profile
router.get('/profile',isLogin,userController.profile);

module.exports=router;
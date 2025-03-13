const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth.controller');


//register route
router.post('/register',authController.register);
//login route
router.get('/login',authController.login);


module.exports=router;
const express=require('express');
const router=express.Router();
const eventController=require('../controllers/event.controller');

//active event that are available for betting 
router.get('/active',eventController.activeEvent);

module.exports=router;
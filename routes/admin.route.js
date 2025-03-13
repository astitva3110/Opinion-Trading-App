const express=require('express');
const router=express.Router();
const adminController=require('../controllers/admin.controller');
const isAdmin=require('../middlewares/role.middleware')

//create a event
router.post('/create/event',isAdmin,adminController.create);
//get all the trade 
router.get('/trade',isAdmin,adminController.getTrade);
//edit route
router.put('/edit/:id',isAdmin,adminController.edit)

module.exports=router;
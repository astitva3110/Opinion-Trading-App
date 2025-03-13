const express=require('express');
const router=express.Router();
const tradeController=require('../controllers/trade.controller');
const IsLogin=require('../middlewares/auth.middleware')


//betting in an event
router.post('/bet/:id',IsLogin,tradeController.bet);

module.exports=router;
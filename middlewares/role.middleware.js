const jwt=require('jsonwebtoken');
require('dotenv').config();

const isAdmin=(req,res,next)=>{
    try{
        const token=req.header('authorization').split(' ')[1];
        if(!token){
            return res.status(401).json({message:"Access Denied",success:false});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.user.role!=="admin"){
            return res.status(403).json({message:"You are not authorized",success:false});
        }
        req.user=decoded.user;
        next();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error",success:false});
    }
}
module.exports=isAdmin;
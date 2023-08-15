const jwt=require('jsonwebtoken');
const User=require('../models/userSchema');
const auth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
      jwt.verify(token,'databyte',(err,decodedtoken)=>{
        if(err){
            res.redirect('/login');
        }
        else{
            next();
        }
      })
    }
    else{
      res.redirect('/login');
    }
}
const checkUser=(req,res,next)=>{
  const token=req.cookies.jwt;
  if(token){
    jwt.verify(token,'databyte',async(err,decodedtoken)=>{
      if(err){
        res.locals.user=null;
        next();
      }
      else{
        const user=await User.findById(decodedtoken.id);
        res.locals.user=user;
        next();
      }
    })
  }
  else{
    res.locals.user=null;
     next();
  }
}

module.exports={auth,checkUser};
const jwt=require('jsonwebtoken');
const User=require('../models/userSchema');
const mongoose=require('mongoose');

const {model,modelArray}=require('../models/userSchemaMain');
const { json } = require('express');


    
 

function updateArrays(result,route){
  let nameArray=[];
  let  typeArray=[];
  let  descriptionArray=[];
  let  dateArray=[];  
   result.forEach((data)=>{
     data.dataObject.forEach((response)=>{
      nameArray.push(response.name);
      typeArray.push(response.type);
      descriptionArray.push(response.description);
      dateArray.push(response.date);
     
     
     })
   })
   return [nameArray,typeArray,descriptionArray,dateArray,route];
}

const maxAge=1000*60*60*24;
const catchError=(err)=>{
    const errorObject={email:'',password:''};
    if(err.code===11000){
      errorObject['email']='this email has already been registered';
      console.log(err.message)
      return errorObject;
    }
    
    if(err.message==='you have not signed in,please sign in'){
      errorObject['email']='please sign in';
      console.log(err.message)
      return errorObject;
    }
    if(err.message==='password is incorrect'){
      errorObject['password']='incorrect password';
      console.log(err.message)
      return errorObject;
    }
    if(err.message.includes('user validation failed')){
      Object.values(err.errors).forEach((error)=>{
        errorObject[error.path]=error.message;
        
      })
    }
    console.log(err.message)
    return errorObject; 
}
const createToken=(id)=>{
   return jwt.sign({ id },'databyte',{
    expiresIn:maxAge/1000
   })
}
const signup_get=(req,res)=>{
    res.render('signup');
}
let user;
const signup_post=async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
  
    try{
       user=await User.create({
          email,password
      });
      modelArray.find({id:user.id})
      .then((result)=>{
        
        const route=[];
        result.forEach(result=>{
         route.push(result._id);
        });
         
         const array=updateArrays(result,route);
        
        display(array);
        res.json(array);
          
       
      })
      .catch((err)=>{
        console.log(err);
      })
      console.log('added to db');
      const token=createToken(user._id);
      res.cookie('jwt',token,{
        maxAge:maxAge,HttpOnly:true
      })
      res.json(user);
      
    }
   
    catch(err){
     
      const errorData=catchError(err);
      console.log(errorData);
      res.json(errorData);
      // console.log(err);
      
   
    }
  }
const login_get=(req,res)=>{
  res.render('login');
}

const login_post=async(req,res)=>{
   const {email,password}=req.body;
   
  
   try{
     user=await User.login(email,password);
     
    const token=createToken(user._id);
      res.cookie('jwt',token,{
        maxAge:maxAge,HttpOnly:true
      })

       modelArray.find({id:user.id})
        .then((result)=>{
          getId(user.id);
         const route=[];
         result.forEach(result=>{
          route.push(result._id);
         });
          
          const array=updateArrays(result,route);
          
          display(array);
          res.json(array);
          
        })
        
        .catch((err)=>{
          console.log(err);
        })
    
   }
   catch(err){
    const errorDataLogin=catchError(err);
    res.json(errorDataLogin);
   }
}  


const home=(req,res)=>{
    res.render('home');
}
const main_get=(req,res)=>{
 
  res.render('main'); 
}



const main_post=async(req,res)=>{
  const {name,type,description,date}=req.body;
    
  
  try{
   
   const data=await model.create({name,type,description,date});
   const dataArray=await modelArray.create({dataObject:[data],id:user});
   
   
   console.log('data of group added !');
   
   console.log(dataArray);
   
   res.json(data);
  }
  catch(err){
    console.log(err);
  }
  
}

const logout=(req,res)=>{
  res.cookie('jwt','',{maxAge:1});
  res.redirect('/');
}
let data;
let dataId;
function display(res){
  
 data=res;
}
function getId(res){
  dataId=res;
}

const cards=(req,res)=>{
  console.log(data);
  res.json(data);
  
 
}

const route=(req,res)=>{
  const id=req.params.id;

  console.log(id);
  console.log(typeof id);
  console.log('hello');
   if(mongoose.Types.ObjectId.isValid(id)){
    modelArray.find({_id:id})
    .then((result)=>{
     console.log(result[0].dataObject[0]);
     console.log(`the user email is ${user.email}`);
     res.render('routeParameter',{dataBtn:result[0].dataObject[0],dataBtnid:result[0]._id,pageId:id,userEmail:user.email});
     
    })
    .catch((err)=>{
      console.log(err);
      console.log('error id');
    })  
   }
   else{
    console.log('error else');
   }
     
}
const allCards=(req,res)=>{//user details =user object
   
    modelArray.find({
      id:{$ne:user._id},
    })
    .then((result)=>{
      console.log(result);
       res.json(result);
    })
    console.log("allcards");
 }
//  const currentUserId=(req,res)=>{
//   res.json(dataId);
//  }
let length;
let dataArraySearch;
 const searchCardsPost=(req,res)=>{
  
     const {searchvalue}=req.body;
     console.log(searchvalue);
     console.log('hello');
     
     
     
     const conditions=[
      {'dataObject.name':searchvalue},
      {'dataObject.type':searchvalue}
     ]
     
        
          modelArray.find({$or:conditions})
          .then((result)=>{
              length=result.length;
              console.log(length);
            if(result.length){
              
                console.log(result);
                
                dataArraySearch=result;
                res.json('yes');
               
               
             
             
            }
            else{
              console.log('data sent');
              res.json(dataArraySearch);
            }
            
             
              
            })
            .catch((err)=>{
              console.log(err);
            })
        }
    
   
 const searchCardsGet=(req,res)=>{
   res.render('search');
 }
 const noResult=(req,res)=>{
  res.render('noResult');
 }
 const deleteGroup=(req,res)=>{
  
  const id=req.params.id;
  const urlObj=req.body;
  console.log(urlObj.url);
  
  console.log(id);
  
  
  try{
    model.findByIdAndDelete(urlObj.url)
      .then((result)=>{
        console.log("success 2");
        
      })
      .catch((err)=>{
        console.log(err);
      })
      if(mongoose.Types.ObjectId.isValid(id)){
        modelArray.findByIdAndDelete(id)
        .then(()=>{
          console.log("success");
          res.json({url:'/main'});
        
      
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      else{
        console.log('error datatype');
      }
    }
  catch(err){
    console.log(err);
  }

 }
 const addCards =(req,res)=>{
    const value=req.body;
    console.log(value.value);
 }
 const error404 =(req,res)=>{
  res.status(404).render('404'); //status code must be 404 write it por else it wont render
 }



module.exports={
    signup_get,signup_post,home,login_get,login_post,main_get,main_post,logout,cards,route
    ,allCards,error404,searchCardsPost,searchCardsGet,noResult,deleteGroup,addCards
  };
    
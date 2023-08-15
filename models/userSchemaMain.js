const mongoose=require('mongoose');
const user=require('./userSchema');

const schema=mongoose.Schema;

const data=new schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
      type:String,
      required:true
    },
   
    
});

const objectData=new schema({
    dataObject:[data],
    id:{
        type:mongoose.Types.ObjectId,
        ref:'user'
        
    },
    idMembers:[{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }]
    
})

const model=mongoose.model('userData',data);
const modelArray=mongoose.model('data',objectData);

module.exports={model,modelArray};

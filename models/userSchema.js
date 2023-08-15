const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const schema=mongoose.Schema;
const {isEmail}=require('validator');
const userSchema=new schema({
    email:{
        type:String,
        required:[true,'please enter the email'],
        unique:true,
        lowecase:true,
        validate:[isEmail,'please enter a valid email']

    },
    password:{
        type:String,
        required:[true,'please enter the password'],
        minlength:[6,'please enter a password of more than 6 characters']

    }
});


userSchema.pre('save',async function(next){
   const salt= await bcrypt.genSalt();
   this.password=await bcrypt.hash(this.password,salt);
   next();
});

userSchema.statics.login= async function(email,password){
    const user=await this.findOne({email});
    if(user){
        const passwordCheck= await bcrypt.compare(password,user.password);
        if(passwordCheck){
            return user;
        }
        else{
            
            throw Error('password is incorrect');
            
        }
    }
    else{
        
        throw Error('you have not signed in,please sign in');
    }
}
const model=mongoose.model('user',userSchema);


module.exports=model;
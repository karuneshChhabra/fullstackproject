const mongoose =require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
   name:{
       type: String,
       required: true,
       trim: true,
       maxlength: 32
   },
   lastName:{
    type: String,
    trim: true,
    maxlength: 32
   },
   email:{
       type:String,
       trim:true,
       required:true,
       unique:true
   },
   userInfo:{
       type:String,
       trim:true
   },
   //To do for encruption of the password filed.
   encry_password:{
       type:String,
       required:true,  
   },
   salt:{
       type:String,
   },
   role:{
       type:Number,
       default:0
   },
   purchases:{
       type : Array,
       default:[]
   },

},{timestamps:true});

userSchema.methods={
  authenticate:function(plainPassword){
    return this.securePassword(plainPassword)===this.encry_password;
  },  
  securePassword:function(plainPassword){
     if (!plainPassword) return "";
     try{
       const password = crypto.createHmac('sha256', this.salt)
        .update(plainPassword)
        .digest('hex');
       console.log(password);
       return password;


     }catch(err){
       return ""
     }
  }
}

userSchema.virtual('password')
  .set(function(plainPassword){
   this._password=plainPassword;
   this.salt=uuidv4();
   this.encry_password=this.securePassword(plainPassword);
   })
   .get(function(){
    return this.encry_password;
},{timestamps:true});


module.exports= mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')
const valid=require('validator')

const adminSchema = new mongoose.Schema({
 email:{
    type:String,
    required:true,
    unique:true,
    validate:{
        validator:valid.isEmail,
        message:"enter a valid email"
    }
 },
 password:{
   type:String,
   required:true
 }

});

adminSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    
    this.password=await bcrypt.hash(this.password,12);
    next()
})

adminSchema.methods.passcheck=async function(p_input,p_actual)
{
  return await bcrypt.compare(p_input,p_actual)
}

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

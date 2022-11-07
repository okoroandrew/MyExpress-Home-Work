const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    email: {unique:true, type:String},
    name: String,
    password: String,
    bio: String
})
const userModel = mongoose.model("userSchema", userSchema)
module.exports=userModel
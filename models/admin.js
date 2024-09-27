const mongoose=require('mongoose')
const adminSchema=mongoose.Schema({
  name:{
    type:String
  },
  username:{
    type:String
  },
  password:{
    type:String
  }
})

const adminModel=mongoose.model("admin",adminSchema)
module.exports=adminModel
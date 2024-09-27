const mongoose=require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/AirAndWater`);

const userSchema=mongoose.Schema({
  username:{
    type:String
  },
  password:{
    type:String
  },
  name:{
    type:String
  },
  city:{
    type:String
  },
  address:{
    type:String
  }
})

const userModel=mongoose.model("user",userSchema)
module.exports=userModel
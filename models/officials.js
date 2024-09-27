const mongoose=require('mongoose')
const officialsSchema=mongoose.Schema({
  department:{
    type:String
  },
  username:{
    type:String
  },
  password:{
    type:String
  }
})

const officialsModel=mongoose.model("officials",officialsSchema)
module.exports=officialsModel
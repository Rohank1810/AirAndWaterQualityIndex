const mongoose=require('mongoose')
const querySchema=mongoose.Schema({
  question:{
    type:String
  },
  username:{
    type:String
  }
})

const officialsModel=mongoose.model("query",querySchema)
module.exports=officialsModel
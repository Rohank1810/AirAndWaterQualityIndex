const express=require('express')
const router=express.Router()

const adminModel=require("../models/admin")

router.get("/",(req,res)=>{
  res.render("adminRegister")
})

router.post("/add",async(req,res)=>{
  let {name,username,password}=req.body
  let createdAdmin=await adminModel.create({
    username:username,
    password:password,
    name:name,
   })
   console.log(createdAdmin)
   res.redirect("/")
})

router.get("/dashboard",(req,res)=>{
  res.render("adminDashboard")
})

router.get("/updateAdmin",(req,res)=>{
  res.render("updateAdmin")
})
router.post("/update", async (req, res) => {
  const { name, username, password } = req.body;

  try {
      const updatedAdmin = await adminModel.findOneAndUpdate(
          { username: username }, 
          { password: password, name: name }, 
          { new: true } 
      );

      if (!updatedAdmin) {
          return res.status(404).send("The user you are trying to modify is not present in the database.");
      }
      res.redirect("/admin/dashboard");
  } catch (error) {
      console.error("Error updating admin details:", error);
      res.status(500).send("An error occurred while updating admin details.");
  }
});

module.exports = router;


module.exports=router
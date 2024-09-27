const express=require('express')
const router=express.Router()
const userModel=require("../models/user")

router.get("/",(req,res)=>{
  res.render("userRegister")
})

router.post("/add",async(req,res)=>{
  let {name,username,location,password,city}=req.body
  let createdUser=await userModel.create({
    username:username,
    password:password,
    name:name,
    city:city,
    address:location
   })
   console.log(createdUser)
   res.redirect("/")
})
router.get("/dashboard",(req,res)=>{
   res.render("userDashboard")
})

router.get("/viewAllUser", async (req, res) => {
   try {
       const users = await userModel.find(); 
       res.render("viewAllUser", { users }); 
   } catch (err) {
       console.error(err);
       res.status(500).send("Server Error");
   }
});

router.get("/delete",(req,res)=>{
   res.render("deleteUser")
})

router.post("/deleteForm", (req, res) => {
   const username = req.body.username;

   userModel.findOneAndDelete({ username: username })
       .then(deletedUser => {
           if (!deletedUser) {
               return res.status(404).send("User not found.");
           }
           res.redirect("/admin/dashboard")
       })
       .catch(err => {
           res.status(500).send("Error deleting user.");
       });
});

router.get("/update",(req,res)=>{
    res.render("updateUser")
  })
  router.post("/updateUser", async (req, res) => {
    const { name, username, password, city, address } = req.body;
  
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { username: username }, 
            { 
                name: name, 
                password: password, 
                city: city, 
                address: address 
            }, 
            { new: true } // Return the updated document
        );
  
        if (!updatedUser) {
            return res.status(404).send("The user you are trying to modify is not present in the database.");
        }
        res.redirect("/user/dashboard");
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).send("An error occurred while updating user details.");
    }
});

//view one
router.get("/view", (req, res) => {
    res.render("viewUser", { user: null, error: null }); 
});

router.post("/view", async (req, res) => {
    const { username } = req.body;

    try {
        const user = await userModel.findOne({ username: username });

        if (!user) {
            return res.render("findUserForm", { user: null, error: "User not found!" });
        }
        res.render("viewUser", { user: user, error: null });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.render("viewUser", { user: null, error: "An error occurred while fetching user details." });
    }
});

module.exports=router

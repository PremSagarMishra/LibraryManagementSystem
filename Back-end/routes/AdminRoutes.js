const express = require("express");
const { adminSignupMiddleware ,adminLoginMiddleware ,adminMiddleware } = require("../middlewares/middleware");
const router = express.Router();

const Admins = require("../Models/adminModel");



//route to signup using username,password, name and doj( date of joining)
router.post("/admin/signup", adminSignupMiddleware, (req, res) => {

    Admins.findOne({ username: req.body.username })
        .then(foundAdmin => {
            if (foundAdmin) {
                res.send("Error User already exists");
            } else {
                // Adding new admin
                const password=(req.body.password).toString();
                if(password.length<8){
                    res.send("Error Password length should be more than 8 characters")
                    return;
                }
                const newAdmin = new Admins({
                    username: req.body.username,
                    password: req.body.password,
                    name:req.body.name,
                    doj:req.body.doj
                });
                newAdmin.save()
                    .then(() => {
                        res.send("New Admin added successfully");
                    })
                    .catch(err => {
                        res.send(err)
                        
                    });
            }
        })
        
});
//route to login using username and password
router.post("/admin/login",adminLoginMiddleware,(req,res)=>{
    console.log(req.body.username,req.body.password)
    Admins.findOne({username:req.body.username,password:req.body.password}).then(foundAdmin=>{
        if(foundAdmin){
            res.send("admin "+foundAdmin._id)
        }else{
            res.send("Error Admin not found")
        }
    }).catch(err=>{
        res.send("Error logging in: "+err)
    })
})
//route to get the detail of admin profile
router.get("/admin/profile",adminMiddleware,(req,res)=>{
    Admins.findOne({_id:req.query.auth})
    .then(foundAdmin =>{
        if(foundAdmin){
            res.send(foundAdmin)
        }
        else{
            res.send("Error Admin not found")
        }
    })
    .catch(err =>{
        res.send("Error "+err)
    })


})


//route to edit the profile details of the admin
router.put("/admin/profile", adminMiddleware, (req, res) => {
    const { name, doj,password,username} = req.body;
    const adminId = req.query.auth;

    if (!name || !doj) {
        return res.status(400).send("Error Please provide all required fields.");
    }

    Admins.findByIdAndUpdate({_id:adminId}, { name, doj ,password,username}, { new: true })
        .then(updatedStudent => {
            if (updatedStudent) {
                res.send(updatedStudent);
            } else {
                res.status(404).send("Error Admin not found.");
            }
        })
        .catch(err => {
            res.status(500).send("Error: " + err);
        });
});


module.exports = router;

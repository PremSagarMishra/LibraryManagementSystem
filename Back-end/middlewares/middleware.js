const Students=require("../Models/studentModel")
const Admins=require("../Models/adminModel")

const adminSignupMiddleware=(req,res,next)=>{
    if(req.body.username!=null && req.body.password!=null){
        next()
    }
    else
    res.send("Signup failed please send details")
}

const adminLoginMiddleware=(req,res,next)=>{
    if(!req.body.username||!req.body.password){
        res.send("Enter login details")
    }else {
        next();
    }
}

const studentMiddleware= (req,res,next)=>{
    if(!req.body.auth){
        res.send("Unauthorised")
        return;
    }
    const key=(req.body.auth)
    
        Students.find({id:key})
        .then((foundStudent)=>{
            if(foundStudent){
                next()
            }else{
                res.send("Unauthorised")
                return;
            }
        }).catch(err=>{
            res.send("Errror "+err)
        })
    

}
const adminMiddleware= (req,res,next)=>{
    if(!req.body.auth){
        res.send("Unauthorised")
        return;
    }
    const key=(req.body.auth)
    
        Admins.find({id:key})
        .then((foundAdmin)=>{
            if(foundAdmin){
                next()
            }else{
                res.send("Unauthorised")
                return;
            }
        }).catch(err=>{
            res.send("Errror "+err)
        })
    

}

module.exports={adminSignupMiddleware, adminLoginMiddleware,studentMiddleware, adminMiddleware}
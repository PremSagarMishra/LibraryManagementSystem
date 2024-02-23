const express = require("express");
const router = express.Router();
const Students = require("../Models/studentModel");
const {studentMiddleware, adminMiddleware}=require("../middlewares/middleware")
router.post("/student/signup", (req, res) => {
    Students.find({ registerno: req.body.registerno })
        .then(foundStudents => {
            if (foundStudents.length > 0) {
                res.send("Student already exists");
            } else {
                const [registerno,name,course,yearofadmission, password]=[req.body.registerno,req.body.name,req.body.course,req.body.yearofadmission,req.body.password]  
                
                if(registerno.length<=0 || name.length<=0||course.length<=0||yearofadmission.length<=0 || password.length<=0){
                    res.send("Enter details properly")
                    return;
                }
                const newStudent = new Students({
                    registerno: registerno,
                    name: name,
                    course: course,
                    yearofadmission: yearofadmission,
                    password:password
                });

                newStudent.save()
                    .then(() => {
                        res.send("Signed Up successfully");
                    })
                    .catch(err => {
                        res.status(500).send("Error: " + err);
                    });
            }
        })
        .catch(err => {
            res.status(500).send("Error: " + err);
        });
});

router.post("/student/login",(req,res)=>{
    Students.findOne({registerno:req.body.registerno,password:req.body.password})
    .then(foundStudent =>{
        if(foundStudent){
            res.send("student "+foundStudent._id)
        }
        else{
            res.send("User not found")
        }
    }).catch(err=>{
        res.send("Error "+err)
    })
})


router.get("/student/profile",studentMiddleware,(req,res)=>{

    Students.findOne({_id:req.body.auth})
    .then(foundStudent =>{
        if(foundStudent){
            res.send(foundStudent)
        }
        else{
            res.send("Student not found")
        }
    })
    .catch(err =>{
        res.send("Error "+err)
    })

})

router.put("/student/profile", studentMiddleware, (req, res) => {
    const { name, course, yearofadmission } = req.body;

    const studentId = req.body.auth;

    if (!name || !course || !yearofadmission) {
        return res.status(400).send("Please provide all required fields.");
    }

    Students.findByIdAndUpdate({_id:studentId}, { name, course, yearofadmission }, { new: true })
        .then(updatedStudent => {
            if (updatedStudent) {
                res.send(updatedStudent);
            } else {
                res.status(404).send("Student not found.");
            }
        })
        .catch(err => {
            res.status(500).send("Error: " + err);
        });
});


router.get("/admin/students",adminMiddleware,(req,res)=>{
    const registerno=req.query.registerno
    var q={}
    if(registerno){
        q={...q,registerno}
    }
    Students.find(q)
    .then((student)=>{
        res.send(student)
    })
    .catch((err)=>{
        res.send("Error ",err)
    })
})


router.delete("/admin/students", adminMiddleware, (req, res) => {
    const registerno = req.body.registerno;
    if (!registerno) {
        res.send("Enter the details");
        return; // Return to exit the function early if details are not provided
    }
    Students.deleteOne({ registerno })
        .then(result => {
            if (result.deletedCount === 1) {
                res.send("successfully deleted");
            } else {
                res.send("Student not found");
            }
        })
        .catch(err => {
            res.send("Error " + err);
        });
});

router.put("/admin/students", adminMiddleware, (req, res) => {
    const { _id, registerno, name, course, yearofadmission } = req.body;

    if ((!_id && !registerno) || !name || !course || !yearofadmission) {
        return res.status(400).send("Please provide all required fields including either _id or registerno.");
    }

    const query = _id ? { _id } : { registerno };

    Students.findOneAndUpdate(query, { name, course, yearofadmission }, { new: true })
        .then(updatedStudent => {
            if (updatedStudent) {
                res.send(updatedStudent);
            } else {
                res.status(404).send("Student not found.");
            }
        })
        .catch(err => {
            res.status(500).send("Error: " + err);
        });
});


module.exports = router;

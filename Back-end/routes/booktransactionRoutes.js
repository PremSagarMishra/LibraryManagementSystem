const express=require("express")
const router=express.Router();
const BT=require("../Models/bookTransactionsModel")
const {adminMiddleware}=require("../middlewares/middleware")



router.get("/admin/booktransactions",adminMiddleware,(req,res)=>{
    BT.find({})
    .then((transactions)=>{
        res.send(transactions)
    })
    .catch(err=>{
        res.send("Error ",err)
    })

})
router.get("/admin/booktransactions/:transactionId",adminMiddleware,(req,res)=>{
    const transactionId=req.params.transactionId
    BT.find({_id:transactionId})
    .then((transactions)=>{
        res.send(transactions)
    })
    .catch(err=>{
        res.send("Error ",err)
    })

})


router.post("/admin/booktransactions",adminMiddleware,(req,res)=>{
    const {bookISBN ,studentregisterno, transactiondate, returndate}=req.body;
    const newTransaction=new BT({
        bookISBN,
        studentregisterno,
        transactiondate,
        returndate
    })

    newTransaction.save()
    .then(()=>{
        res.send("Successfully saved")
    })
    
})

router.put("/admin/booktransactions/:transactionId",adminMiddleware,((req,res)=>{
    const transactionId=req.params.transactionId;
    const {bookISBN ,studentregisterno, transactiondate, returndate,returneddate,penalty}=req.body;
    BT.findOneAndUpdate({_id:transactionId},{bookISBN,studentregisterno,transactiondate,returndate,returneddate,penalty},{new:true})
    .then((updatedTransaction)=>{
        res.send(updatedTransaction)
    })
    .catch((err)=>{
        res.send("Error ",err)
    })
}))

router.delete("/admin/booktransactions",adminMiddleware,(req,res) =>{
    const transactionId= req.query.Id;
    BT.deleteOne({_id:transactionId})
    .then(()=>{
        res.send("Successfully deleted")
    })
    .catch((err)=>{
        res.send("Error "+err)
        })
})
module.exports=router
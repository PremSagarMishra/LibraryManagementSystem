const express=require("express")
const router=express.Router()
const Books=require("../Models/bookModel")

const {adminMiddleware}=require("../middlewares/middleware")


router.post("/admin/books",adminMiddleware,(req,res)=>{
    Books.findOne({ISBN:req.body.ISBN})
    .then((foundBook)=>{
        if(foundBook){
            res.send("Book already exist")

        }else{

            const{title,thumbnail,author,ISBN,description,tags}=req.body;

            if(!title || !thumbnail || !author || !ISBN || !description || !tags){
                res.send("Enter details properly")
            }
            const newBook=new Books({
                title:title,
                thumbnail:thumbnail,
                author:author,
                ISBN:ISBN,
                description:description,
                tags:tags
            })
            newBook.save()
            .then(()=>{
                res.send("Book added successfully")
            })
            .catch(err => {
                res.send(err)
            })
        }
    })

})

router.put("/admin/books",adminMiddleware,(req,res)=>{
    const {id,ISBN, title, thumbnail, author, description, tags}=req.body;
    if(!ISBN || !title || !thumbnail || !author || !description || !tags){
        res.send("Send complete details")
    }
    Books.findByIdAndUpdate({_id:id},{ISBN,title,thumbnail,author,description, tags},{new:true})
    .then(updatedBook=>{
        res.send(updatedBook)
    })
    .catch(err=>{
        res.send("Error "+err)
    })
})

router.delete("/admin/books",adminMiddleware,(req,res)=>{
    const {id,ISBN}=req.body;
    Books.deleteOne({_id:id,ISBN})
    .then(()=>{
        res.send("Deleted Successfully")

    })
    .catch(err=>{
        res.send("Error ",err)
    })
})

router.get("/books", (req,res)=>{
    
    var searchConstraint={}
    const {title, author, ISBN}= req.query;
    if(title!=null && title!=""){
        searchConstraint={...searchConstraint,title:req.query.title}
    }
    if(author!=null && author!=""){
        searchConstraint={...searchConstraint,author:req.query.author}
    }
    if(ISBN!=null && ISBN!=""){
        searchConstraint={...searchConstraint,ISBN:req.query.ISBN}
    }

    console.log(searchConstraint)
    Books.find(searchConstraint)
    .then((books)=>{
        res.send(books)
    }).catch((err)=>{
        res.send(err)
    })
})


router.get("/books/:bookId", (req, res) => {
    const bookId = req.params.bookId;

    // Here you can retrieve the book with the given bookId from the database
    Books.findOne({ISBN:bookId})
        .then(book => {
            if (!book) {
                return res.status(404).send("Book not found");
            }
            res.send(book);
        })
        .catch(err => {
            res.status(500).send("Error: " + err);
        });
});











module.exports=router;
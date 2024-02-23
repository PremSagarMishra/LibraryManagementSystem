const express=require("express")
require("./dbcon")
const AdminRoutes=require("./routes/AdminRoutes.js")
const studentRoutes=require("./routes/studentRoutes.js")
const bodyParser = require("body-parser")
const bookRoutes=require("./routes/bookRoutes.js")
const booktransactionRoutes=require("./routes/booktransactionRoutes.js")
const port=3000

const app = express();
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
// Use the admin routes
app.use("/", AdminRoutes);
app.use("/",studentRoutes)
app.use("/",bookRoutes)

app.use("/",booktransactionRoutes)

app.listen(port,()=>{
    console.log("Server running at 3000")
})
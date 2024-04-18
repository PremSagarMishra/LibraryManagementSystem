import "./Style.css";
import admin from "../assets/admin.webp";
import student from "../assets/student.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../App";
const RoleSelection = () => {
  const navigate=useNavigate();

  const {loggedIn}=useContext(UserContext)

  if(loggedIn==true){
    navigate("/home")
  }

  return (
    <div className="container" style={{height:"80vh"}}>
      <div className="card" style={{height:"400px",width:"33%"}}>
        <img src={admin} alt="" />
        <p>
          Register or login as a admin if you are a admin. Here you will get
          access to more feature like managing students and managing books
          transactions.
        </p>
        <div className="button-group">
        <Button onClick={()=>{navigate("/admin/signup")}} variant="contained" color="success">
          Signup
        </Button>
        <Button onClick={()=>{navigate("/admin/login")}} variant="outlined">Login</Button>
        </div>
      </div>
      <div className="card" style={{height:"400px",width:"33%"}}>
        <img src={student} alt="" />
        <p>
          Register or login as a student if you are a student. Here you will get
          only features available for students.
        </p>
        <div className="button-group">
        <Button onClick={()=>{navigate("/student/signup")}} variant="contained" color="success">
          Signup
        </Button>
        <Button onClick={()=>{navigate("/student/login")}} variant="outlined">Login</Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;

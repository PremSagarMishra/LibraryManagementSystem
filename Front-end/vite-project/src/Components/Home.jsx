import { UserContext } from "../App";
import { useNavigate } from "react-router"
import { useContext } from "react";

import "./Style.css"

const Home = () => {
  const navigate=useNavigate()
  const {role,loggedIn}=useContext(UserContext);

  if(!loggedIn){
    navigate("/")
  }
  if(role!=="student"&& role!=="admin"){
    navigate("/")
  }

  
  console.log(role,loggedIn)
  return (  
    <div className="container">
      <div className="home-card">
        <h1>Welcome to Library Management System</h1>
        <p>You are logged in as a {role}</p>
      </div>
    </div>
    
  )
}

export default Home
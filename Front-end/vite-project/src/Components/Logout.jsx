import { useNavigate } from "react-router"
import { useContext } from "react";
import { UserContext } from "../App";

const Logout = () => {

  const {setRole,setLoggedIn}=useContext(UserContext)
    const navigate=useNavigate();

    localStorage.clear()
    setRole("")
    setLoggedIn(false)
    navigate("/")
  return (
    <div>Redirecting to the login page after logging out</div>
  )
}

export default Logout
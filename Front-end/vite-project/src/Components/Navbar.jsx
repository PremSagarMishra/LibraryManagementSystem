import { useNavigate } from "react-router"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { GiHamburgerMenu } from "react-icons/gi";
import { AdminFeatures } from "./AdminFeatures";
import { useContext } from "react";
import { UserContext } from "../App";
import { StudentFeatures } from "./StudentFeatures";

const Navbar = () => {
  const navigate=useNavigate();

  const {role,loggedIn}=useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  var DrawerList;

  if(role=="admin"){
    DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {AdminFeatures.map((feature, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(feature.link)}>
                <ListItemText primary={feature.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    );
  }
  if(role=="student"){
      DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {StudentFeatures.map((feature, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(feature.link)}>
                <ListItemText primary={feature.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    );
  }
  
  return (
    <div className="navbar">
      {loggedIn&&<span><p  className="hamburger" onClick={toggleDrawer(true)}><GiHamburgerMenu /></p>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer></span>}
        <p >Library Management System</p>
    </div>
  )
}

export default Navbar

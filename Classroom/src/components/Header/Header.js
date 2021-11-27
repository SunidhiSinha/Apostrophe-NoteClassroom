import {
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    Avatar,
  } from "@material-ui/core";
  import { Add } from "@material-ui/icons";

  import { CreateClass, JoinClass } from "..";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
  import React from "react";
import { useStyles } from "./style";
import { useLocalContext } from "../../context/context";
// this is the header which has the join class ,create class logout , note and teams link
const Header = ({children}) => {
    const classes= useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const{setCreateClassDialog,setJoinClassDialog,loggedInUser,logout}=useLocalContext();
  const handleCreate =()=>{
    handleClose()
    setCreateClassDialog(true)
  }  
  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };
  return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar className={classes.toolbar}>
                <div className={classes.headerWrapper}>
            {children}
            <img
              src="finalLogo.png"
              alt="Classroom"
            />
           
          </div>
          <div className={classes.header__wrapper__right}>
          
          <a style={{display: "table-cell"}} target="_blank" rel="noopener noreferrer" href="https://www.microsoft.com/en-in/microsoft-teams/group-chat-software" >
             
             <PhotoCamera className={classes.icon}/>
            
          </a>
          {/*This contains the link of the note app. I have made the note app independent so if you want to clone the app , clone the note app seperately and once runned it will run on local host 3006 */}
          <a style={{display: "table-cell"}} target="_blank" rel="noopener noreferrer" href="https://apostrophe-note.herokuapp.com " >
          <CreateRoundedIcon className={classes.icon}/></a>
              <Add onClick={handleClick}  className={classes.icon}/>
              
              <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class</MenuItem>
            </Menu>
              <div>
                <Avatar 
                onClick={()=>logout()} src={loggedInUser?.photoURL}className={classes.icon}/>
              </div>
              </div>
                </Toolbar>
            </AppBar>
            <CreateClass/>
            <JoinClass/>
        </div>
    );
};

export default Header;

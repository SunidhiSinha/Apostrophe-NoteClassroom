import React from 'react'
import { Button } from "@material-ui/core";
import logo from "../../assets/logo.jpg"
import './style.css'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useLocalContext } from '../../context/context';
//This is the login page
const Login = () => {
    const {login,loggedInUser}= useLocalContext()
    console.log(loggedInUser);
    return (
        
        <div className='login'>
            
            <img className='login_logo' src={logo} alt="Classroom"/>
            <Button  variant="contained" startIcon={<AssignmentIndIcon /> } onClick={() => login()}>
 
        Login Now !
      </Button>
        </div>
    )
}

export default Login

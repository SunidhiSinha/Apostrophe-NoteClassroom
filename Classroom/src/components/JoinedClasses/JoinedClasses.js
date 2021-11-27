import { Avatar } from '@mui/material'
import React from 'react'
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom'
import "./style.css"
//shows the classes joined
const JoinedClasses = ({ classData }) => {
    return (
       <li className='joinedList'>
           <div className="joinedWrapper">
               <div className="joinedContainer">
                   <div className="joinedImgWrapper"/>
                   <div className="joinedImage"/>
                   <div className="joinedContent">
                       <Link className="joinedTitle" to={`/${classData.id}`}>
                        <h2>{classData.className}</h2>
                        </Link>
                        <p className="joinedOwner">{classData.owner}</p>
                       </div>
                       
                   </div>
                   <Avatar className="joinedAvatar"
                   src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="/>
           </div>
           <div className="joinedBottom">
           <Link  to={`/${classData.id}`}>
        <LaunchIcon/>
        </Link>
      </div>

       </li>
    )
}

export default JoinedClasses

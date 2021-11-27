import { Button,Avatar, Dialog ,Slide,TextField} from '@material-ui/core';
import React,{ useState } from 'react'
import { Close } from "@material-ui/icons";
import { useLocalContext } from "../../context/context";
import "./style.css";
import db from "../../lib/firebase";
//this handles the joining of a new class
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const JoinClass = () => {
    const {
      joinClassDialog,
      setJoinClassDialog,
      loggedInUser
     
    } = useLocalContext();
  
    const [classCode, setClassCode] = useState("");
    const [email, setemail] = useState("");
    const [error, setError] = useState();
    const [joinedData, setJoinedData] = useState();
    const [classExists, setClassExists] = useState(false);
    const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("CreatedClasses")
      .doc(email)
      .collection("classes")
      .doc(classCode)
      .get()
      .then((doc) => {
        if (doc.exists && doc.owner !== loggedInUser.email) {
          setClassExists(true);
          setJoinedData(doc.data());
          setError(false);
        } else {
          setError(true);
          setClassExists(false);
          return;
        }
      });
    /*If the classes exists then the collection is created at the firebase*/
    if (classExists === true) {
      db.collection("JoinedClasses")
        .doc(loggedInUser.email)
        .collection("classes")
        .doc(classCode)
        .set({
          joinedData,
        })
        .then(() => {
          setJoinClassDialog(false);
        });
    }
  };
    return (
        <div>
            <Dialog fullScreen open={joinClassDialog} onClose={()=>setJoinClassDialog(false)} TransitionComponent={Transition}>
                <div className="joinClass">
                    <div className="joinClassWrapper">
                        <div className="joinClassWrapper2" onClick={()=>setJoinClassDialog(false)}>
                            <Close className="joinClassSvg"/>
                            <div className="joinClassTopHead">
                                Join a new Class
                                </div>
                            </div>
                            <Button className="joinClassBtn"variant="outlined" color="primary" onClick={handleSubmit}>
                                Join
                            </Button>
                        </div>
                        <div className="joinClassForm">
                            <p  className="joinClassFormText">
                                You are currently joined in using the mail id:{loggedInUser?.email}
                            </p>
                            <div className="joinClassLoginInfo">
                                <div className="joinClassClassRight">
                                    <Avatar src={loggedInUser?.photoURL}/>
                                    <div className="joinClassLoginText">
                                        <div className="joinClassLoginName">{loggedInUser?.displayName}</div>
                                        <div className="joinClassLoginEmail">{loggedInUser?.email}</div>
                                    </div>
                                </div>
                                <Button variant="outlined" color="primary">
                                Logout
                                </Button>
                            </div>
                            </div>
                            <div className="joinClassForm">
                <div
              style={{ fontSize: "1.25rem", color: "black" }}
              className="joinClassFormText"
            >
              {/*Enter the details*/}
              Class Code
              </div>
              <div
              style={{ color: "#3c4043", marginTop: "-5px" }}
              className="joinClassFormText"
            >
              Enter the class code and teacher's email.
            </div>
            <div className="joinClassLoginInfo">
              <TextField
                id="outlined-basic"
                label="Class Code"
                variant="outlined"
               value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                error={error}
                helperText={error && "No class was found"}
                
              />
              {  /*if the class code is wrong then it shows no class is found*/}
              <TextField
                id="outlined-basic"
                label="Teacher's email"
                variant="outlined"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
                </div>

                </div>
               

            </Dialog>
        </div>
        )
    
};

export default JoinClass

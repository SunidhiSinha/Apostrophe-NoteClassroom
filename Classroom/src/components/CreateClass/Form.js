
import { Button, DialogActions, TextField   } from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/context";
import { v4 as uuidV4 } from "uuid";
import db from "../../lib/firebase";
//this is the form which appears after the dialog box
const Form = () => {
  const[className,setClassName]= useState("")
  const[Section,setSection]= useState("")
  const[Subject,setSubject]= useState("")
  const[Room,setRoom]= useState("")
  const { loggedInMail, setCreateClassDialog } = useLocalContext();

  const addClass =(e)=>{
    e.preventDefault()
    const id=uuidV4();
//creates collection of four fields and stores the collection in firebase
    db.collection('CreatedClasses')
    .doc(loggedInMail)
    .collection('classes')
    .doc(id).set({
      owner: loggedInMail,
        className: className,
        section: Section,
        room: Room,
        id: id,
    }).then(()=>{
      setCreateClassDialog(false);
    })
  }
    return (
        <div className='form'>
           <p className="classTitle">Create a new Class</p>
           <div className="formInputs">
             {/*4 textfields are created*/}
           <TextField
          id="filled-basic"
          label="Class Name (required)"
          className="formInput"
          variant="filled"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Section"
          className="formInput"
          variant="filled"
          value={Section}
          onChange={(e) => setSection(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Subject"
          className="formInput"
          variant="filled"
          value={Subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Room"
          className="formInput"
          variant="filled"
          value={Room}
          onChange={(e) => setRoom(e.target.value)}
        />

           </div>

           <DialogActions>
        <Button onClick={addClass} color="primary">
          Create
        </Button>
      </DialogActions>
        </div>
    )
}

export default Form;

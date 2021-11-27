import { Avatar,TextField ,Button} from '@mui/material'
import React, { useState } from "react";
import db, { storage } from "../../lib/firebase";
import "./style.css";
import firebase from "firebase";
import { Announcement } from "..";
import { useLocalContext } from "../../context/context";
//Through this we can make announcements
const Main = ({classData}) => {
    const { loggedInMail } = useLocalContext();
    const {loggedInUser}=useLocalContext();
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInput] = useState("");
    const [image, setImage] = useState(null);
 const isSame=loggedInMail===classData.owner;
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);
//adding the files to the firebase storage
    uploadImage.on("state_changed", () => {
      storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then((url) => {
          db.collection("announcments")
            .doc("classes")
            .collection(classData.id)
            .add({
              timstamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              text: inputValue,
              sender: loggedInMail,
            });
        });
    });
  };
    return (
        <div className="main">
        <div className="main_wrapper">
          <div className="main_content">
            <div className="main_wrapper1">
              <div className="main_bgImage">
                <div className="main_emptyStyles" />
              </div>
              <div className="main_text">
                <h1 className="main_heading main_overflow">
                  {classData.className}
                </h1>
                <div className="main_section main_overflow">
                  <h5>Section: {classData.section}</h5>
                     
                </div>
                <div className="main_wrapper2">
                  <em className="main_code">Class Code :</em>
                  <div className="main_id">{classData.id}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="main_announce">
        {/*If the person is the owner of the class then he/see can only make announcements and the students can only view the announcements*/}
          <div className="main_announcements">
            <div className="main_announcementsWrapper">
            {isSame?(
              <div className="main_ancContent">

                  {showInput?(
                  
                  <div className="main_form"> 
                  <TextField
                   id="filled-multiline-flexible"
                   multiline
                   label="Announce Something to class"
                   variant="filled"
                   value={inputValue}
                   onChange={(e) => setInput(e.target.value)}
                 />
                 <div className="main_buttons">
                      <input
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        type="file"
                      />
                      <div>
                      <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpload} color="primary"  variant="contained">
                          Post
                        </Button>
                          </div>
                      </div>

                  </div>
                  
                  ):(
                    
                    <div className='main_wrapper100' onClick={()=> setShowInput(true)}>
                    <Avatar src={loggedInUser?.photoURL}/>
                    <div>Announce Something to class</div>
                </div>
                  )}
                 
                  </div>
                  ):(<div><h1  className="announceApart">Announcements</h1></div>)}
                  </div>
                  <Announcement classData={classData} />
                  </div>
                  
              </div>
          </div>
          </div>
    )
}

export default Main

import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "../../lib/firebase";
import "./style.css";
//adding the announced text and files to the page
const Announcment = ({ classData }) => {
  const [announcment, setAnnouncment] = useState([]);
// adding a collection named announcments in firebase database.
  useEffect(() => {
    if (classData) {
      let unsubscribe = db
        .collection("announcments")
        .doc("classes")
        .collection(classData.id)
        .onSnapshot((snap) => {
          setAnnouncment(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData]);
 // console.log(announcment);
//  the announced section contains the sender email,image sent and file link. if the file is image then it is viewed else the fixed image is viewed and a link is added to the img.
  return (
    <div>
      {announcment.map((item) => (
        <div className="anc">
          <div className="anc_Cnt">
            <div className="anc_top">
              <Avatar  />
              <div>{item.sender}</div>
            </div>
            <p className="anc_txt">{item.text}</p>
            <a href={item.imageUrl} target="_blank" rel="noreferrer">
           
            <img className="anc_img" src={item.imageUrl} onError={(e)=>{e.target.onerror = null; e.target.src="https://p.kindpng.com/picc/s/33-332806_pdf-icon-hd-png-download.png"}} alt="" width="100" height="120" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcment;
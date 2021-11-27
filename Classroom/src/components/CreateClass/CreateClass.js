import { Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent, } from '@material-ui/core'; //importing from material-ui
import React, { useState } from 'react';
import { useLocalContext } from '../../context/context';
import './style.css';
import Form from "./Form";
const CreateClass = () => {
    const{createClassDialog,setCreateClassDialog}=useLocalContext();
   const[check,setChecked]=useState(false)
   const [showForm, setShowForm] = useState(false);
    return (
        <div>
          {/*Adding the dialog box which when checked proceeds to form*/}
            <Dialog onClose={()=>setCreateClassDialog(false)}
            aria-labelledby="customized-dialog-title"
            open={createClassDialog}
            maxWidth={showForm?"lg":"xs"}
            className='forDialog'>
                {showForm ? (
          <Form />
        ) : (
          <>
                    <div className="classTitle">
                      {/* Adding the contents of the dialog box like terms and contents. its vhecks 
                      whether the person has read the terms and condition or not */}
                        Using Apostrophe classroom for school/college? 
                    </div>
                    <DialogContent className='classContent'>
                        <p className='classText'>
                           If so, sign up for free using college/School 
                            <a href="/help" className="classLink">
                                Apostrophe for Education
                            </a>
                            acount before you can use classroom.
                            <a href='/learn' className="classLink2">
                                Click to learn more.
                            </a>
                            <p>
                            Apostrophe for Education decides which servies can be used by their students and it also provides aditional
                            <a href="/privacy" className="classLink classLink2">privacy and security.</a>
                            Please read the<a href="/terms" className="classLink classLink2"> terms and condition</a>before moving further.
                            </p>

                        </p>
                        <div className='classCheckboxWrapper'>
                        <Checkbox color="primary" onChange={() => setChecked(!check)} />
                <p>
                  I've read and understand the above notice, and I'm not using
                  Classroom at a school with students
                </p>
                        </div>
                    </DialogContent>
                    <DialogActions>
              <Button autoFocus onClick={() => setCreateClassDialog(false)}>
                Close
              </Button>
                      {/*When the checked box is checked then the continue button appears  */}
              <Button
                autoFocus
                color="primary"
                disabled={!check}
                onClick={() => setShowForm(true)}
              >
                Continue
              </Button>
            </DialogActions>
            
            </>
             )}
            </Dialog>
        </div>
      
    );
};

export default CreateClass

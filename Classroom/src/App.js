import React, { useEffect, useState } from "react";
import { Drawer, JoinedClasses, Login,Main} from "./components";
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";

import { useLocalContext } from "./context/context";
import db from "./lib/firebase";
import { IsUserRedirect, ProtectedRoute } from "./routes/Routes";

function App (){
  const { loggedInMail } = useLocalContext();

  const [createdClasses, setCreatedClasses] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);

  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db
        .collection("CreatedClasses")
        .doc(loggedInMail)
        .collection("classes")
        .onSnapshot((snapshot) => {
          setCreatedClasses(snapshot.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [loggedInMail]);

useEffect(() => {
  if (loggedInMail) {
    let unsubscribe = db
      .collection("JoinedClasses")
      .doc(loggedInMail)
      .collection("classes")
      .onSnapshot((snapshot) => {
        setJoinedClasses(snapshot.docs.map((doc) => doc.data().joinedData));
      });

    return () => unsubscribe();
  }
}, [loggedInMail]);

//if the person is logged in then the login page is not accesible and if logged out then the main page is not accesible
  return(
    <Router>
      <Switch>
        {/*If we open the class then the path is /id */ }
      {createdClasses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        {joinedClasses.map((item, index) => (
          <Route key={index} exact path={`/${item.id}`}>
            <Drawer />
            <Main classData={item} />
          </Route>
        ))}
        <IsUserRedirect
        user={loggedInMail}
        loggedInPath='/'
        path="/signin"
        exact
        >
          <Login/>
        </IsUserRedirect>
        
        <ProtectedRoute user={loggedInMail} path="/" exact>
          <Drawer/>
          <ol className='joined'>
          {
createdClasses.map((item)=>(
  <JoinedClasses classData={item}/>
))
          }
          {
            joinedClasses.map((item)=>(
              <JoinedClasses classData={item}/>
            ))
          }
          </ol>
        </ProtectedRoute>
       
        
      </Switch>
    </Router>
  );
 
}

export default App;

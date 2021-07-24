import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {auth,db} from './Firebase';
import Home from "./Home";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Message from "./Message";
import Nav from "./Nav";


class App extends React.Component{
  constructor(){
    super();
    this.state={
      isSignedIn:false,
      currentUser:{}
    }
  }

  uiConfig={

    signInFlow :"popup",
    signInOptions:[ firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks:{
      signInSuccess:()=> false
    }
  }



  componentDidMount(){

    auth.onAuthStateChanged(user1=>{
        this.setState({
          isSignedIn:!!user1,
          currentUser:user1
        });
      })
  }

 

  render(){

    return(


      <div>

      {this.state.isSignedIn?
        

        <Router>
         
           <Nav currentUser={this.state.currentUser} />
          <Switch>
            <Route  path="/" exact component={()=> <Home data={this.state} />}/>
            <Route  path="/message/:id"  exact component={ Message}/>
            
          </Switch>

        </Router>


          :
          <div className="card" style={{marginTop:"50px",width:"50%",marginLeft:"auto",marginRight:"auto"}}>
            <div className="card-body">
              <h1 style={{fontWeight:"bold",textAlign:"center",color:"purple"}}>Secure Messenger</h1>
              <StyledFirebaseAuth  uiConfig={this.uiConfig} firebaseAuth={auth}/>
            </div>
          </div>}
    </div>);
    }
}
export default App;

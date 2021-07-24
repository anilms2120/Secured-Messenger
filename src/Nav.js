import React from "react";
import {Link} from "react-router-dom";
import {db,auth} from "./Firebase"





 
// function Nav(){
	

// 	return (<nav className="nav" style={{backgroundColor:"purple"}}>
// 		  <a className="nav-link" href="#" style={{fontWeight:"bold",fontSize:"25px",color:"white"}}>Secured Messenger</a>
// 		  <a className="nav-link" href="/" style={{fontWeight:"bold",fontSize:"25px",color:"white"}}>Home Page</a>
// 		  <a className="nav-link" href="#" onClick={handleClick} style={{fontWeight:"bold",fontSize:"25px",color:"white"}}>Signout</a>
// 		</nav>
// 	)
// }



class Nav extends React.Component{
	constructor(){
		super();
		this.state={arr:[]};
		this.handleClick=this.handleClick.bind(this);
	}

	handleClick(e){
	    e.preventDefault();
	    
	    auth.signOut();

	    
 	}



	render(){
		return (<nav className="nav" style={{backgroundColor:"purple"}}>
			  <a className="nav-link" href="#" style={{fontWeight:"bold",fontSize:"25px",color:"white"}}>Secure Messenger</a>
			  <a className="nav-link" href="/" style={{fontWeight:"bold",fontSize:"25px",color:"white"}}>Home Page</a>
			  <a className="nav-link" href="#" onClick={this.handleClick} style={{fontWeight:"bold",fontSize:"25px",color:"white"}}>Signout</a>
			</nav>
		)
	}
}

export default Nav;
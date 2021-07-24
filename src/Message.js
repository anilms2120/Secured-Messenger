import React from "react"
import {db,auth} from "./Firebase"
import firebase from "firebase"


import {rsa,publicKey,privateKey} from './rsa';

var CryptoJs = require("crypto-js");

var RSAKey=require('react-native-rsa');
const bits=1024;
const exponent ='10001';
var rsa2=new RSAKey();

rsa2.generate(bits,exponent);

// var publicKey=rsa.getPublicString();
// var privateKey=rsa.getPrivateString();

class Message extends React.Component{

	constructor(){
		super();
		this.state={
			input:"",
			otherUser:{},
			messages:[],
			currentUser : {},
			receiverPublicKey:""
		}
		//this.handleSubmit=this.handleSubmit.bind(this);
		this.handleSend=this.handleSend.bind(this);
		this.AES = this.AES.bind(this);
		this.DES = this.DES.bind(this);
		this.RSA = this.RSA.bind(this);
	
	}

	send_message(from,to,message,num)
	{
		if(num==1)
		{
			var ciphertext = CryptoJs.DES.encrypt(JSON.stringify(message),from+to).toString();
			return ciphertext

		}
		else
		{
			var ciphertext = CryptoJs.AES.encrypt(JSON.stringify(message),from+to).toString();
			return ciphertext
		}
		// var ciphertext = CryptoJs.AES.encrypt(JSON.stringify(message),from+to).toString();
		// return ciphertext
		//
		// rsa2.setPublicString(this.state.receiverPublicKey);
		// var encrypt=rsa2.encrypt(message);
		// console.log("ohters key",this.state.receiverPublicKey)
		// return encrypt;
	}

	receive_message(m)
	{
		if(m.type==1)
		{
			var bytes = CryptoJs.DES.decrypt(m.message,m.from+m.to);
			var decryptdata = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
			return decryptdata


		}
		else
		{
			var bytes = CryptoJs.AES.decrypt(m.message,m.from+m.to);
			var decryptdata = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
			return decryptdata


		}
		
		// var decryptdata = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
		// return decryptdatar
		// console.log("first ",cipher);
		// rsa.setPrivateString(privateKey);
		// var decrypt= rsa.decrypt(cipher);

		
		// console.log("mesage is",decrypt)
		// return decrypt;

		
	}


	
	componentDidMount(){


		db.collection("users").doc(this.props.match.params.id).get().then(snapshot=>{
			//console.log(snapshot.data());
			this.setState({
				otherUser:snapshot.data()
			})
			db.collection("messages").orderBy('timestamp').onSnapshot(snapshot=>{

				let temp_message=snapshot.docs.map(doc=>{

					if((doc.data().from=== auth.currentUser.email && doc.data().to=== this.state.otherUser.email) ||

						(doc.data().to=== auth.currentUser.email && doc.data().from=== this.state.otherUser.email)){
						return doc.data()
					}
				});
				this.setState({messages : temp_message});
				})
		})

		// var query=db.collection("keys").where("email","==","sunilms2120@gmail.com");
		// query.onSnapshot(snapshot=>{
		// 	snapshot.forEach(doc=>{
		// 		console.log("anil",doc.data().public_key)
		// 		this.setState(prev=>{
		// 			return{
		// 				receiverPublicKey:doc.data().public_key
		// 			}
		// 		})

		// 	})
		// })
	}

	DES(e)
	{
		e.preventDefault();
		// console.log(auth.currentUser.email);
		// console.log(this.state.otherUser.email)
		// console.log(this.state.input)
		var cipher = this.send_message(auth.currentUser.email,this.state.otherUser.email,this.state.input,1)
		console.log("cipher",cipher)
		db.collection("messages").add({
			from:auth.currentUser.email,
			to:this.state.otherUser.email,
			message:cipher,
			timestamp:firebase.firestore.FieldValue.serverTimestamp(),
			type:1
		})
		document.querySelector("#text-area").value = null
	}

	AES(e)
	{
		e.preventDefault();
		// console.log(auth.currentUser.email);
		// console.log(this.state.otherUser.email)
		// console.log(this.state.input)
		//var cipher = CryptoJs.AES.encrypt(JSON.stringify(this.state.input),auth.currentUser.email+this.state.otherUser.email).toString();
		var cipher = this.send_message(auth.currentUser.email,this.state.otherUser.email,this.state.input,2)
		
		db.collection("messages").add({
			from:auth.currentUser.email,
			to:this.state.otherUser.email,
			message:cipher,
			timestamp:firebase.firestore.FieldValue.serverTimestamp(),
			type:2
		})
		document.querySelector("#text-area").value = null
	}

	RSA(e)
	{
		e.preventDefault();
		// console.log(auth.currentUser.email);
		// console.log(this.state.otherUser.email)
		// console.log(this.state.input)
		//var cipher = CryptoJs.AES.encrypt(JSON.stringify(this.state.input),auth.currentUser.email+this.state.otherUser.email).toString();
		var cipher = this.send_message(auth.currentUser.email,this.state.otherUser.email,this.state.input,3)
		
		db.collection("messages").add({
			from:auth.currentUser.email,
			to:this.state.otherUser.email,
			message:cipher,
			timestamp:firebase.firestore.FieldValue.serverTimestamp(),
			type:3
		})
		document.querySelector("#text-area").value = null
	}


	handleSend(e)
	{
		this.setState({input:e.target.value});
	}

	render(){
		console.log(3)
		console.log(this.state.messages)
		let div_messages=this.state.messages.map((m)=>{
			if(m!=undefined)
			{
				let style={ position:"relative",width:"fit-content",height:"fit-content",borderRadius:"10px",marginTop:"2px",padding:"6px"};
				if((m.from==auth.currentUser.email && m.to==this.state.otherUser.email)||(m.to==auth.currentUser.email && m.from==this.state.otherUser.email))
				{
					if(m.from==auth.currentUser.email)
					{
						style.marginLeft="auto";
						style.backgroundColor="purple";
						style.color="white";
						style.fontWeight="bold"
					}
					else
					{
						style.marginLeft="10px";
						style.backgroundColor="white";
						style.color="purple"
						style.fontWeight="bold"
					
					}
					return <div className="card-body border" style={style}>{this.receive_message(m)}</div>
				}
				
			}
		})
		console.log("f");
		return (
			<div className="container-sm" style={{marginTop:"30px"}}>
				<div class="card">
 				 	<div class="card-body" style={{height:"100%"}}>
						<header ><h1 style={{textAlign:"center",fontWeight:"bold",color:"green"}}>{this.state.otherUser.name}</h1></header>
						{div_messages}
						<form>
							
							<div className="input-group mb-3">
							  <input id="text-area" type="text" style={{ marginTop:"10px"}}type class="form-control" onChange={this.handleSend} placeholder="Type Something" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
							  <div className="input-group-append">
							    <button class="btn btn-outline-success" onClick={this.AES} style={{ marginTop:"10px"}} type ="button">AES</button>
							    <button class="btn btn-outline-danger" onClick={this.DES} style={{ marginTop:"10px"}} type ="button">DES</button>
							    <button class="btn btn-outline-primary" onClick={this.RSA} style={{ marginTop:"10px"}} type ="button">RSA</button>
							  </div>
							</div>
							
						</form> 
					</div>
				</div>
				
			</div>
			
		)
	}
}

export default Message;
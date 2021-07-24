import React from "react";
import firebase from "firebase";
import {auth,db} from "./Firebase";
import {Link} from 'react-router-dom';


import {rsa,publicKey,privateKey} from './rsa';
// rsa.setPublicString(publicKey);
// rsa.setPrivateString(privateKey);









class Home extends React.Component{
	constructor()
	{
		super();
		this.state={
			temp_array:[],
			currentUser:{},
			private_key:"",
			public_key:""
		}
	}


	componentDidMount(){
		let users_map = {}
		// db.collection("keys").onSnapshot(snapshot=>{
		// 	let temp_array=snapshot.docs.map(doc=>{
		// 		return doc.data();
		// 	})
		// 	let check1=false;
		// 	for(let i=0;i<temp_array.length;i++)
		// 	{
		// 		if(temp_array[i].email==auth.currentUser.email)
		// 		{
		// 			check1=true;
		// 		}
		// 	}
		// 	// if(check1==false)
		// 	// {
		// 	// 	console.log("inserted bitch");
		// 	// 	db.collection("keys").add({
		// 	// 		email:auth.currentUser.email,
		// 	// 		public_key:"public_key"+auth.currentUser.email,
		// 	// 	})
		// 	// 	this.setState(prev=>{
		// 	// 		return{
		// 	// 			private_key:"public_key"+auth.currentUser.email,
		// 	// 			public_key:"private_key"+auth.currentUser.email,
		// 	// 		}
		// 	// 	})
		// 	// }
			
		// })

		// var user=firebase.auth().currentUser;
		// if(user!=null)
		// {
		// 	var query=db.collection("keys").where("email","==",auth.currentUser.email);
		// 	query.onSnapshot(snapshot=>{
		// 		let count=0;
		// 		snapshot.forEach(doc=>{
		// 			count=count+1;
		// 		})
		// 		if(count==0)
		// 		{
		// 			db.collection("keys").add({
		// 				email:auth.currentUser.email,
		// 	 			public_key:publicKey
		// 			})
		// 			this.setState(prev=>{
		// 				return{
		// 					private_key:privateKey,
		// 					public_key:publicKey,
		// 				}
		// 			})
		// 		}
		// 	});
		// }

		// if(query.length ==0)
		// {
		// 	console.log("yes");
		// }
		// else
		// {
		// 	console.log(query);
		//}
		db.collection("users").onSnapshot(snapshot=>{
			let temp_array=snapshot.docs.map(doc=>{
				return doc;
			});
			let check=false;
			let users_array = []
			for(let i=0;i<temp_array.length;i++)
			{
				if(temp_array[i].data().email === auth.currentUser.email)
				{
					check = true;
					continue;
				}
				if(users_map[temp_array[i].data().email]==undefined)
				{
					users_map[temp_array[i].data().email]=temp_array[i].data();
					users_array.push(temp_array[i])
				}

			}
			if(check===false)
			{
				db.collection("users").add({
					name:this.props.data.currentUser.displayName,
					photo_url:this.props.data.currentUser.photoURL,
					email:this.props.data.currentUser.email
				})
			}

			this.setState({
				temp_array:users_array,
				currentUser:this.props.data.currentUser
			});
		});
	// 	firebase.auth().onAuthStateChanged(user=>{
	// 		if(user){
	// 			var query=db.collection("keys").where("email","==",auth.currentUser.email);
	// 			query.onSnapshot(snapshot=>{
	// 				let count=0;
	// 				snapshot.forEach(doc=>{
	// 					count=count+1;
	// 				})
	// 				if(count==0)
	// 				{
	// 					db.collection("keys").add({
	// 						email:auth.currentUser.email,
	// 			 			public_key:publicKey,
	// 					})
	// 					this.setState(prev=>{
	// 						return{
	// 							private_key:privateKey,
	// 							public_key:publicKey,
	// 						}
	// 					})
	// 				}
	// 			});

	// 		}
	// 		else
	// 		{
	// 			this.setState(prev=>{
	// 				return{
	// 					currentUser:{}
	// 				}
	// 			})
	// 		}

	// 	});

	};

	render(){
		let div_array=this.state.temp_array.map((data)=>{
			if(data.data().email!= this.state.currentUser.email)
			{

				const path = '/message/'+data.id
				return(

					<li className="list-group-item">
					<span style={{fontWeight:"bold",color:"green"}}>{data.data().name}</span>
					<Link to={path}><button className="btn btn-info" style={{ color:"white",fontWeight:"bold",marginLeft:"70%"}}>message</button></Link>
					</li>
				)
			}
			
		})
		return(
		<div className="container" style={{marginTop:"30px",width:"50%"}}>
			<ul class="list-group">
				{div_array}
			</ul>
		</div>);

	};

}

export default Home;
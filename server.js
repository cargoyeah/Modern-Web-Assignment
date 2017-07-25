var express = require("express");
var app     = express();
app.use(express.static('/home/cabox/workspace'));
var nodemailer = require('nodemailer');

// old server.js
var path    = require("path");
var fs = require("fs");
var qs = require("querystring");
var mongodb = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
require("events").EventEmitter.prototype._maxListeners = 100;

var mongodbServer = new mongodb.Server("localhost", 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db("dataD", mongodbServer);
var usersssssss="";
var isTriedLogin = false; var isLoginSuccessful = false; var canRegis = true; var isTriedLogin = false; var isActiveSuccessful = true ; var canRegis = true;

//mail use
var nodemailer = require('nodemailer');





app.get('/map',function(req,res){
	console.log("/map");
  res.sendFile(path.join('/home/cabox/workspace/main/map.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/',function(req,res){
	console.log("req.url = /");
	res.redirect('/main/index.html')
});
 
app.get('/main/home.html',function(req,res){
	console.log("req.url = /main/home.html");
	res.redirect('/main/index.html')
});

app.get('/main/mylist',function(req,res){
	console.log("req.url = /main/mylist");
	res.redirect('/main/mylist.html')
});

app.get('/main/register',function(req,res){
	console.log("req.url = /main/register");
	res.redirect('/main/register.html')
});

app.get('/removeuser',function(req,res){
	console.log("req.url = /removeuser");
	MongoClient.connect("mongodb://localhost:27017/dataD", function (err, db) {
    db.collection('user', function (err, collection) {
        collection.remove({username:"cargo123"}, {w:1}, function(err, result) {
            if(err) throw err;    
            console.log('Document Removed Successfully');
        });
			
		
    });
	});
});

app.get('/activeuser',function(req,res){
	console.log("req.url = /activeuser");
	var user= req.param("user")
	console.log( user +"here");
	MongoClient.connect("mongodb://localhost:27017/dataD", function (err, db) {
    db.collection('user', function (err, collection) {
        collection.update(
					{ username: user }, { $set: { active: true } }, {multi:true}, 
					function(err, data) {
							if (data) {
								console.log("Successful to Active");
								
							} else {
								console.log("Failed to Active");
							}
						});
		
    });
	});
	res.redirect('/main/activeuser.html')
});

app.post('/login', function(req, res) {
					

					 
    // Switch msg into a JSON object
				//res.send('/home/cabox/workspace/main/map.html');
        console.log('start post to login');
				console.log('req.url='+req.url);
	
				var formData = "", msg = "", obj = "", user, loginuser;
	
				 return req.on("data", function(data) {
					 console.log('start req.on"data"');
					 formData += data;}).on("end", function(chunk) {
					 
						 console.log('start req.on"end"');
						 user = qs.parse(formData);
						 msg = JSON.stringify(user);
						 obj = JSON.parse(msg);
						 
						 console.log("305cde="+msg);
						 console.log("obj[act]="+obj['act'] + "obj[ac]="+obj['ac']  + "obj[email]="+obj['email'] );
						 
						 
						  if(obj['act']=="login"){
								console.log('start act = login');
								isTriedLogin = true;
								
								console.log("input name    = "+obj['ac']);
								console.log("input password= "+obj['pw']);
								// Handle data received from login page
								var username = obj['ac'];
								var password = obj['pw'];
								
								// Handle data received from login page
								MongoClient.connect("mongodb://localhost:27017/dataD", function (err, db) {
									db.collection("user", function (err, collection) {
										collection.find().toArray(function(err, items) {
											if(err) throw err;
											// Check whether there is data in the dataD
											console.log('you have '+items.length+' user acc in DB as below:');
											if (items != "") {
												// Check whether the user account exists
												for (var i=0; i<items.length; i++) {
													console.log("name = "+items[i].username + " ,pass = "+items[i].password + " ,email = "+items[i].email + " ,active = "+items[i].active+ " ,list = "+items[i].list);

													if (username == items[i].username && password == items[i].password) {
														usersssssss= items[i].username;
														console.log("Login successful");
														console.log("username= "+username+" check="+items[i].username);
														console.log("password= "+password+" check="+items[i].password);
														isLoginSuccessful = true;
														isActiveSuccessful == true
														
														if (items[i].active == false) {
															console.log("acc is inactive");
															isLoginSuccessful = false;
															isActiveSuccessful = false;
															//res.send({  usernamedisplay: username , loginstatus: "inactive"  });
														}
													}
													
													
												}
												
												if(isLoginSuccessful == false){
														if(isActiveSuccessful == true){
															console.log("Fail to login");
													  	res.send({  usernamedisplay: username , loginstatus: "fail"  });
														}else if(isActiveSuccessful == false){
															res.send({  usernamedisplay: username , loginstatus: "inactive"  });
														 }
														
													
													
														}

												if(isLoginSuccessful == true){
														console.log("Successful to login");
													res.send({  usernamedisplay: username , loginstatus: "login"  });
														}
											}
										});
									});	
							})

							}
						  if(obj['act']=="logout"){
								isLoginSuccessful = false;
								console.log("Successful to logout");
								username ="";
								obj['ac'] ="";
								console.log("obj['ac'] =" + obj['ac'] +",username ="+ username);
								res.send({  usernamedisplay: username , loginstatus: "logout"  });
							}					 
						  if(obj['act']=="signup"){
								console.log("start to SignUp");
								// Send obj data to dataD
								var username = obj['ac'];
								
								
								MongoClient.connect("mongodb://localhost:27017/dataD", function (err, db) {

									db.collection("user", function(err, collection) {

										var isSignupDuplicate = false;
										collection.find().toArray(function(err, items) {
											if(err) throw err;
											// Check whether there is data in the dataD
											console.log('you have '+items.length+' user acc in DB as below:');
											console.log("obj['ac'] = " + obj['ac']);
											console.log("obj['pw'] = " + obj['pw']);
											
											if (items != "") {
												// Check whether the user account exists
												for (var i=0; i<items.length; i++) {
													console.log("name = "+items[i].username);
													if (username == items[i].username ) {
														console.log("Sign Up Fail");
														console.log("this is duplicate ! username= "+username+" check="+items[i].username);
														isSignupDuplicate = true;
													} 
												}
												
												
											}
											
											if( isSignupDuplicate == true){
												    console.log("isSignupDuplicate in checking true = "+isSignupDuplicate);
													  console.log("Failed to Insert : username is duplicate");
														res.send({  usernamedisplay: username , loginstatus: "duplicate"  });
												}
											if (isSignupDuplicate == false){
												 res.send({  usernamedisplay: username , loginstatus: "singup"  });
												console.log("isSignupDuplicate in checking false = "+isSignupDuplicate);
												collection.insert({
													username: obj.ac,
													password: obj.pw,
													email: obj.email,
													active: false,
													list:[""]
													}, function(err, data) {
													if (data) {
														console.log("Successful to Insert");
													} else {
														console.log("Failed to Insert");
													}
													});
												
												var transporter = nodemailer.createTransport({
														service: 'gmail',
														auth: {
															user: 'non.alcoholic.beers@gmail.com',
															pass: '25458111'
														}
													});

													var mailOptions = {
														from: 'non.alcoholic.beers',
														to: obj.email,
														subject: 'Activate your non-alcoholic-beers Account',
														html: '<h2>Thanks you for your registration</h2><h2><a href="http://assignment2017-cargoyeah650366.codeanyapp.com:3000/activeuser?user='+ obj.ac +'">please check here to activate your account</a></h2><p>Username: '+obj.ac+'<br/>Password: '+obj.pw+'<p>'
													};

													transporter.sendMail(mailOptions, function(error, info){
														if (error) {
															console.log(error);
														} else {
															console.log('Email sent: ' + info.response);
														}
													});
												
												
												
												
												}
										});

									});
								});
							}
					 })
				 })
	
app.post('/mylist', function(req, res) {
	
	var formData = "", msg = "", obj = "", user, loginuser, prdcode, prdlist, newprdlist;
	
	return req.on("data", function(data) {
					 console.log('start req.on"data"');
					 formData += data;}).on("end", function() {
					 
						 console.log('start req.on"end"');
						 user = qs.parse(formData);
						 msg = JSON.stringify(user);
						 obj = JSON.parse(msg);
						 
						 console.log("obj[act]="+obj['act']);
						 console.log("obj[ac]="+obj['ac']);
						 console.log("obj[prdcode]="+obj['prdcode']);
						 loginuser = obj['ac'];
						 prdcode = obj['prdcode'];
						 newprdlist = [];	
						 prdlist = [];
						 isListDuplicate =false;
						 
						 
						 if(obj['act']=="show"){
							 
							 	MongoClient.connect("mongodb://localhost:27017/dataD", function (err, db) {
    
											db.collection('user', function (err, collection) {
												collection.find().toArray(function(err, items) {
													if(err) throw err;
													// Check whether there is data in the dataD
													if (items != "") {
														// Check whether the user account exists
														for (var i=0; i<items.length; i++) {
																if (items[i].username == loginuser ){
																	for (var a=0; a<items[i].list.length; a++) {
																	prdlist.push(items[i].list[a]);
																	}
																}
															}
														
													  console.log("prdlist =" + prdlist);
														res.send({  list: prdlist  });
													}
												});
											});
							 
						 });
						 }

						  if(obj['act']=="add"){
								
								if(obj['ac'] =="") {res.send({  message: "Please Login first"  });}else{
								
											MongoClient.connect("mongodb://localhost:27017/dataD", function (err, db) {

														db.collection('user', function (err, collection) {
															collection.find().toArray(function(err, items) {
																if(err) throw err;
																// Check whether there is data in the dataD
																if (items != "") {
																	isListDuplicate = false;
																	// Check whether the user account exists
																	for (var i=0; i<items.length; i++) {
																			if (items[i].username == loginuser ){
																				console.log("edit name = "+items[i].username);
																				console.log("edit list = "+items[i].list);

																				for (var a=0; a<items[i].list.length; a++) {
																					if (prdcode == items[i].list[a]) {
																					isListDuplicate= true;
																					console.log("it is Duplicate, list["+a+"] ="+ prdcode);
																					}else{
																					console.log("it is not Duplicate, list["+a+"] ="+ prdcode);
																					}
																					prdlist.push(items[i].list[a]);
																				}

																				console.log("view prdlist:"+ prdlist);
																			}

																		}

																	if( isListDuplicate == true){
																	console.log("Failed to Insert : there are duplicate item in list");
																	res.send({  message: "duplicate"  });
																	}


																	if (isListDuplicate == false){
																	console.log("No duplicate item in list, start to insert:");
																	console.log("prdlist = "+ prdlist);
																	console.log("prdcode = "+ prdcode);
																	prdlist.push(prdcode);
																	console.log("prdcode add to prdlist, list = "+ prdlist);
																	if(prdlist[0]==""){
																		prdlist.splice(0, 1);
																	};

																	collection.update(
																		{ username: loginuser }, 
																		{ $set: { list: prdlist } }, 
																		{multi:true}, 
																		function(err, data) {
																						if (data) {
																							console.log("Successful to Insert");
																						} else {
																							console.log("Failed to Insert");
																						}
																					});

																			res.send({  message: "Add Successfully"  });
																			}
																	}
															});
														});

												});
									}
							}
		
		
							if(obj['act']=="remove"){
								
								MongoClient.connect("mongodb://localhost:27017/dataD", function (err, db) {
    
											db.collection('user', function (err, collection) {
												collection.find().toArray(function(err, items) {
													if(err) throw err;
													// Check whether there is data in the dataD
													if (items != "") {
														var PrdIndexInList;
														isListDuplicate = false;
														// Check whether the user account exists
														console.log("start to remove:");
														console.log("prdcode = "+ prdcode);
														
														for (var i=0; i<items.length; i++) {
																if (items[i].username == loginuser ){
																	prdlist = items[i].list;
																	console.log("prdlist = "+ prdlist);
																	for (var a=0; a<items[i].list.length; a++) {
																		if( items[i].list[a] == prdcode){
																					PrdIndexInList = a;
																			console.log("a ="+a);
																					console.log("Find PrdIndexInList = "+ PrdIndexInList);
																				newprdlist = prdlist;
																			  newprdlist.splice(PrdIndexInList, 1)
																				console.log("prdcode remove form prdlist, newlist = "+ newprdlist);
																			 }
																	}
																}
															}
														
													
														
														collection.update(
															{ username: loginuser }, 
															{ $set: { list: newprdlist } }, 
															{multi:true}, 
															function(err, data) {
																			if (data) {
																				console.log("Successful to remove");
																			} else {
																				console.log("Failed to remove");
																			}
																		});

															


														
														
														
														}
													
												});
												
												
												
												

												  
											});

									});
								res.send({  message: "Remove Successfully"  });
								
							}
	})
})
	
app.post('/prddetail',function(req,res){
	var beer_name, beer_description, beer_label_hd, beer_abv, brewery_name, rating_score, rating_count;
	var media = "", user_name ="", user_avatar="",user_rating_score="",created_at="";
	console.log("req.url = /prddetail");

	 var  formData="", msg = "", obj = "", user;
	 return req.on("data", function(data) {
		console.log('start req.on"data"');
		formData += data;
		 
		 }).on("end", function() {
		 
		user = qs.parse(formData);
		msg = JSON.stringify(user);
		obj = JSON.parse(msg);
		console.log('data prd code = '+obj.prdcode);	
		 
		var jsonURL='/home/cabox/workspace/main/json/prd_'+obj.prdcode+'.json';
		 
		fs.readFile( jsonURL , 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
		 beer_name = obj.response.beer.beer_name;
		 beer_description = obj.response.beer.beer_description;
		 beer_label_hd = obj.response.beer.beer_label_hd;
		 beer_abv = obj.response.beer.beer_abv;
		 brewery_name = obj.response.beer.brewery.brewery_name;
		 rating_score = obj.response.beer.rating_score;
		 rating_count = obj.response.beer.rating_count;
		 for (a=0; a<5; a++){
		 		media += obj.response.beer.media.items[a].photo.photo_img_md +',';
			  user_name += obj.response.beer.checkins.items[a].user.user_name +',';
			  user_avatar += obj.response.beer.checkins.items[a].user.user_avatar +',';
			  user_rating_score += obj.response.beer.checkins.items[a].rating_score +',';
			  created_at += obj.response.beer.checkins.items[a].created_at +',';
			 }
		 res.send({  beer_name: beer_name, beer_description : beer_description,  beer_label_hd : beer_label_hd , media : media, beer_abv: beer_abv , 
							   brewery_name: brewery_name, rating_score : rating_score, rating_count: rating_count, user_name : user_name , user_avatar : user_avatar ,
							   user_rating_score : user_rating_score , created_at : created_at
							}) 
						 
      });
		 
		 
		 
	 })

	
});
	

app.listen(3000);

console.log("Running at Port 3000");
		
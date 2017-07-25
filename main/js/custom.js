var showmylist;

$(function() {
		$("#login").click(function(e){
			$(function(){
				var user = {};
				user.act = "login";
				user.ac = $("#log_ac").val();
				user.pw = $("#log_pw").val();
				//alert(user.ac);
				//alert(user.pw);
				$.ajax({
					url: "/login",
					type: "POST",
					data: user,
					jsonp: 'callback',
					dataType: 'json', // expecting JSON to be returned
					success: function(data) {
								 console.log('login process sucess');
                 console.log('usernamedisplay of json : ' + data.usernamedisplay);
								 console.log('loginstatus of json : ' + data.loginstatus);
                
                if(data.loginstatus =="login"){
                  localStorage.setItem("Storageusername", data.usernamedisplay);
								  localStorage.setItem("Storagestatus", data.loginstatus);
                  location.reload();};
                if(data.loginstatus =="fail"){ 
                  $("#errormsg").html("Incorrect Username / Password."); }
							  if(data.loginstatus =="inactive"){ 
                  $("#errormsg").html("Inactive account, please check email to active your account"); }
								 
              },
         error: function() {
                console.log('login process error');
                $("#errormsg").html("error is busy, please try again");
              }});
				return false;
			});
		});
		
		
		

		$("#logout").click(function(e){
			$(function(){
				var user = {};
				user.act = "logout";
				
				//alert(user.act);
				$.ajax({
					url: "/login",
					type: "POST",
					data: user,
					success: function(data){
							 console.log('logout process sucess');
               console.log('usernamedisplay of json : ' + data.usernamedisplay);
							 console.log('loginstatus of json : ' + data.loginstatus);
						   localStorage.setItem("Storageusername", "");
						   localStorage.setItem("Storagestatus", "");
							 window.location.href = 'index.html'
        },
          error: function(e){
						   console.log('logout process error');
							 console.log(e);
					}
				});
				return false;
			});
			
		});
		
		
	
		$("#sign_up").click(function(e){
			var user = {};
			user.act = "signup";
			user.ac = $("#sign_ac").val();
			user.pw = $("#sign_pw").val();
			user.email = $("#sign_email").val();
			
			if(user.ac == ""||user.pw == ""||user.email == ""||$("#sign_pw_re").val()==""){
				alert("Please input all infomration!");
			}else if ( $("#sign_pw_re").val() != user.pw){
				alert("Please input same password at repeat password!");
			}else {
				$.ajax( {
					url: "/login",
					type: "POST",
					data: user,
          jsonp: 'callback',
					dataType: 'json', // expecting JSON to be returned
					success: function(data) {
								 console.log('signup process sucess');
                 console.log('usernamedisplay of json : ' + data.usernamedisplay);
								 console.log('loginstatus of json : ' + data.loginstatus);
								 if(data.loginstatus =="duplicate"){
									 $("#signup_errormsg").html("Your username is Duplicate"); 
								 }else{
									 $("#signup_errormsg").html('<span style="color:#009B63">Singup Successfully ! Please check email to active your account</span>');
								 };
                 
              },
         error: function() {
                console.log('login process error');
                $("#signup_errormsg").html("error is busy, please try again");
              }});
		
			}
			return false;
		});
	
	
	 $("#addtolist").click(function(e){
			var req = {};
			req.act = "add";
			req.ac = loginusername;
			req.prdcode = $.urlParam('prd');
			$.ajax( {
					url: "/mylist",
					type: "POST",
					data: req,
          jsonp: 'callback',
					dataType: 'json', // expecting JSON to be returned
					success: function(data) {
								 console.log('add to list process sucess');
								 alert(data.message);
								
                 
              },
         error: function() {
                console.log('add to list process error');
                alert("fail");
              }});
	 })
	 
	 function RemoveMyListItem(){
		 $(".remove-btn").click(function(){

				var req = {};
				req.act = "remove";
				req.ac = loginusername;
				req.prdcode = $(this).attr("prdcode");
				$.ajax( {
						url: "/mylist",
						type: "POST",
						data: req,
						jsonp: 'callback',
						dataType: 'json', // expecting JSON to be returned
						success: function(data) {
									 console.log('remove process sucess');
									 alert(data.message);
								},
						error: function() {
									console.log('remove process error');
									alert("fail");
								}});
			 location.reload();
			
	 		});
		 
	 }
	 
	 
	 
	 
var mylistcontent;
	 $( document ).ready(function(){
		 //get member Favourites List
		 if(showmylist=="show"){
				console.log( "ready!" );
					var req = {};
					req.act = "show";
					req.ac = loginusername;
					$.ajax( {
							url: "/mylist",
							type: "POST",
							data: req,
							jsonp: 'callback',
							dataType: 'json', // expecting JSON to be returned
							success: function(data) {
										console.log('show list process sucess');
										mylistcontent=data.list;
										DisplayMyList();
									},
						 error: function() {
										console.log('show list process error');
									}});
					 }
		 
		 
		 
		 
		 
			 })
	 
	 
	 //display member Favourites List
	 function DisplayMyList(){
		 for(a=0; a< mylistcontent.length ;a++){
			  var idnum = a+1;
			  var prdjson = '/main/json/prd_'+mylistcontent[a]+'.json';
			 if(mylistcontent[a] == ""){}else{DisplayMyListItem(idnum,prdjson,mylistcontent[a])}

		 }
		 
		 //active remove function
		 RemoveMyListItem();
		 
		
		}
	
	  function DisplayMyListItem(idnum,prdjson,prdcode){
			$(".mylist tbody").append('<tr><td><a id="prd'+idnum+'-link"><img id="prd'+idnum+'-img" /><span id="prd'+idnum+'-name" class="name"></span></a></td><td id="prd'+idnum+'-abv"></td><td><a class="btn btn-template-main remove-btn" prdcode="'+prdcode+'"><i class="fa fa-trash"></i>Remove</a></td></tr>')
			$.getJSON( prdjson , function(beer1data) {
				$('#prd'+idnum+'-link').attr("href",'/main/beer-detail.html?prd='+prdcode);
  			$('#prd'+idnum+'-name').html(beer1data.response.beer.beer_name);
				$('#prd'+idnum+'-img').attr("src",beer1data.response.beer.beer_label_hd);
				$('#prd'+idnum+'-abv').html(beer1data.response.beer.beer_abv + '%');
		 		});
		}
		
			
	

//for UI display (login)
var loginusername = localStorage.getItem("Storageusername");
		var loginstatus = localStorage.getItem("Storagestatus");
console.log("current loginusername =" + loginusername);	
console.log("current loginstatus =" + loginstatus);
		//alert(loginusername);
		if (loginstatus == ""|| loginstatus == null || loginstatus == "undefined" || loginstatus =="logout" || loginstatus =="duplicate"){
			 $("#loginuser span").html("");
			 $("#loginuser").css("display","none");
			 $("#login-btn").css("display","inline");
			 $("#signin-btn").css("display","inline");
		}
		else {
			 $("#loginuser span").html("Welcome! " + loginusername);
			 $("#loginuser").css("display","inline");
			 $("#login-btn").css("display","none");
			 $("#signin-btn").css("display","none");
		}
	

$('#search').hideseek();
$('.searchlist').html('<li><a href="beer-detail.html?prd=32887">Erdinger Alkoholfrei</a></li><li><a href="beer-detail.html?prd=345182">Amstel 0.0</a></li><li><a href="beer-detail.html?prd=20092">Baltika #0 Non-Alcoholic</a></li><li><a href="beer-detail.html?prd=1065551">Root Beer</a></li><li><a href="beer-detail.html?prd=365653">OBOLON NON-ALCOHOLIC</a></li><li><a href="beer-detail.html?prd=17855">0.0% PREMIUM ORIGINAL</a></li><li><a href="beer-detail.html?prd=87078">PAULANER HEFE-WEIIER ALKOHOLFREI</a></li><li><a href="beer-detail.html?prd=180979">WEIIER-ZITRONE ALKOHOLFREI / WEIZEN RADLER NON-ALCOHOLIC</a></li><li><a href="beer-detail.html?prd=36576">CLAUSTHALER AMBER</a></li><li><a href="beer-detail.html?prd=162012">LABATT BLUE NON-ALCOHOLIC</a></li><li><a href="beer-detail.html?prd=877182">TREKHGORNOE NON-ALCOHOLIC</a></li>')
$('#search').keyup(function(){
	if( $(this).val() == "" || $(this).val() ==null){
		$(this).removeClass("search_active");
	}else{
	$(this).addClass("search_active");
	}
})

$('.search_area').blur(function(){
	$(this).removeClass("search_active");
})
	
	
	
	
	
	

});
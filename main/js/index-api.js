var bear1_prdcode = "32887";
var bear2_prdcode = "345182";
var bear3_prdcode = "20092";
var bear4_prdcode = "1065551";


//beer1
$.getJSON('/main/json/prd_'+bear1_prdcode+'.json', function(beer1data) {
	
	var description = beer1data.response.beer.beer_description
	var newdescription = description.substring(0, 250) + "...";
	
  $('#beer1 h3 a').html(beer1data.response.beer.beer_name);
	$('#beer1 .image img').attr("src",beer1data.response.beer.beer_label_hd);
	$('#beer1 .role').html( beer1data.response.beer.beer_abv + "ABV");
	$('#beer1 .text p').html( newdescription) ;
	
	$('#beer1 .image a').attr("href",'/main/beer-detail.html?prd='+bear1_prdcode);
	$('#beer1 .image a').attr("href",'/main/beer-detail.html?prd='+bear1_prdcode);
	
});

//beer2
$.getJSON('/main/json/prd_'+bear2_prdcode+'.json', function(beer1data) {
  $('#beer2 h3 a').html(beer1data.response.beer.beer_name);
	$('#beer2 .image img').attr("src",beer1data.response.beer.beer_label_hd);
	$('#beer2 .role').html(beer1data.response.beer.beer_abv + "ABV");
	$('#beer2 .text p').html(beer1data.response.beer.beer_description);
	
	$('#beer2 .image a').attr("href",'/main/beer-detail.html?prd='+bear2_prdcode);
	$('#beer2 .image a').attr("href",'/main/beer-detail.html?prd='+bear2_prdcode);
});

//beer3
$.getJSON('/main/json/prd_'+bear3_prdcode+'.json', function(beer1data) {
  $('#beer3 h3 a').html(beer1data.response.beer.beer_name);
	$('#beer3 .image img').attr("src",beer1data.response.beer.beer_label_hd);
	$('#beer3 .role').html(beer1data.response.beer.beer_abv + "ABV");
	$('#beer3 .text p').html(beer1data.response.beer.beer_description);
	
	$('#beer3 .image a').attr("href",'/main/beer-detail.html?prd='+bear3_prdcode);
	$('#beer3 .image a').attr("href",'/main/beer-detail.html?prd='+bear3_prdcode);
});
			
//beer3
$.getJSON('/main/json/prd_'+bear4_prdcode+'.json', function(beer1data) {
  $('#beer4 h3 a').html(beer1data.response.beer.beer_name);
	$('#beer4 .image img').attr("src",beer1data.response.beer.beer_label_hd);
	$('#beer4 .role').html(beer1data.response.beer.beer_abv + "ABV");
	$('#beer4 .text p').html(beer1data.response.beer.beer_description);
	
	$('#beer4 .image a').attr("href",'/main/beer-detail.html?prd='+bear4_prdcode);
	$('#beer4 .image a').attr("href",'/main/beer-detail.html?prd='+bear4_prdcode);
});

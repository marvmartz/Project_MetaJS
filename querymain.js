// metamachine with jQuery
//
//
//
//

$(document).ready(function(){

var pos_begin,
    pos_middle,
    pos_end,
    name;	    

var begin = [];
var middle = [];
var end = [];

var uniqueBegin = [];
var uniqueMiddle = [];
var uniqueEnd = [];

var random_Begin;
var random_Middle;
var random_Middle2;
var random_End;

var playlist = [];
var indexes = [];

// start generating playlist on click
$('#generatePlaylist').click(function(event){

// fetch parameters from HTML5 range sliders attr1 to attr6
var attr = [];

attr[0] = $('#attr1').val(); 
attr[1] = $('#attr2').val();
attr[2] = $('#attr3').val();
attr[3] = $('#attr4').val();
attr[4] = $('#attr5').val();


var attrXML = []; // for comparison

// reset Arrays
begin.length = 0;
middle.length = 0;
end.length = 0;
playlist.length = 0;
uniqueBegin.length = 0;
uniqueMiddle.length = 0;
uniqueEnd.length = 0;
indexes.length = 0;


// retrieve data from xml with jQuery.ajax method 
$.ajax({
	type: "GET",
	url: "./xml/metadata.xml",
	dataType: "xml",

		success: function(xml){
			// Note: If playlist remains emty/undefined, try
			// - check if XML is 100% correct, no misspellings, no broken tags etc.
			// - clear browser cache
		$(xml).find('clip').each(
			function(index){
		
			    pos_begin = $(this).find('pos_vorne').text();
		    	pos_middle = $(this).find('pos_mitte').text();
		    	pos_end = $(this).find('pos_hinten').text();
		    	attrXML[0] = $(this).find('liebe').text();
			    attrXML[1] =  $(this).find('glueck').text();
			    attrXML[2] = $(this).find('tradition').text();
			    attrXML[3] =  $(this).find('abenteuer').text();
			    attrXML[4] =  $(this).find('perfektion').text();
		    	//name = $(this).find('name').text();
			    
			    // get suitable videos for the beginning
			    for(i = 0; i < attr.length; i++){
			    
				    if (attrXML[i] == attr[i] && pos_begin == "true") {
				    begin.push(index);

				    }
			    
			    } // end for

			    // get suitable videos for the middlepart
			    for(i = 0; i < attr.length; i++){
			    
				    if (attrXML[i] == attr[i] && pos_middle == "true") {
				    middle.push(index);
				    }
			    
			    } // end for

			    // get suitable videos for the end
			    for(i = 0; i < attr.length; i++){
			    
				    if (attrXML[i] == attr[i] && pos_end == "true") {
				    end.push(index);
				    }
			    
			    } // end for

			}) // end each


			// Filter out the duplicates
	        uniqueBegin = begin.filter(function(elem, pos) {
    			return begin.indexOf(elem) == pos;
  		    	}); // end uniquePlaylist 

	        uniqueMiddle = middle.filter(function(elem, pos) {
    			return middle.indexOf(elem) == pos;
  		    	}); // end uniquePlaylist 

	        uniqueEnd = end.filter(function(elem, pos) {
    			return end.indexOf(elem) == pos;
  		    	}); // end uniquePlaylist 


	        //DEBUG
	        console.log("uniqueBegin", uniqueBegin);
	        console.log("uniqueMiddle", uniqueMiddle);
	        console.log("uniqueEnd", uniqueEnd);


		    // scramble chosen values from generated position-arrays and put them into respective positions of our playlist
		    // after each filling the last item is excluded from the next respective array
		    random_Begin = uniqueBegin[Math.floor(Math.random() * begin.length)];		    
		    indexes[0] = random_Begin;
			uniqueMiddle = $.grep(uniqueMiddle, function(value) { return value != random_Begin; }); // see http://stackoverflow.com/questions/3596089

		    for(i = 1; i < 3; i++){
			    
				random_Middle = uniqueMiddle[Math.floor(Math.random() * uniqueMiddle.length)];
		    	indexes[i] = random_Middle;
		    	uniqueMiddle = $.grep(uniqueMiddle, function(value) { return value != random_Middle;});
			    
			}

		    uniqueEnd = $.grep(uniqueMiddle, function(value) { return value != random_Middle; });
		    random_End = uniqueEnd[Math.floor(Math.random() * uniqueEnd.length)];
		    indexes[3] = random_End;
		 

		    // Prompt indexs in HTML	
			$("#playlist").html(""); // clear old elements before .append new ones
			for(i = 0; i < indexes.length; i++){
				$("#playlist").append('<br>'+indexes[i]);
			}


			// Assemble URL Parms and Redirect to Play.html
			var parmsIndexes = "";
			var parmTicket = attr[0] + "-" + attr[1] + "-" + attr[2] + "-" + attr[3] + "-" + attr[4];
			for(i = 0; i < indexes.length; i++) {
				if (i == 0 ) { parmsIndexes = indexes[i]; }
				else { parmsIndexes += "-" + indexes[i]; }
			}
	        window.location.href = 'play.html?ixs='+parmsIndexes + "tck=" + parmTicket;
		    

		}, // end success: function(xml)
		
		error: function(){ 
			alert("something's wrong Diane");

		} // end error handler


}); // end $.ajax
}); // end .click(function(event)


}) //end jQuery


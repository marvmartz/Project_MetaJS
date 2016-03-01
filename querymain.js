// metamachine with jQuery

$(document).ready(function(){

var pos_begin,
    pos_middle,
    pos_end,
    name;	    

var begin = [];
var middle = [];
var end = [];

var random_Begin = [];
var random_Middle = [];
var random_Middle2 = [];
var random_End = [];

var playlist = [];

// start generating playlist on click
$('#generatePlaylist').click(function(event){

// fetch parameters from HTML5 range sliders attr1 to attr6
var attr = [];

attr[0] = $('#attr1').val(); 
attr[1] = $('#attr2').val();
attr[2] = $('#attr3').val();
attr[3] = $('#attr4').val();
attr[4] = $('#attr5').val();
attr[5] = $('#attr6').val();


var attrXML = []; // for comparison

// reset Arrays
begin.length = 0;
middle.length = 0;
end.length = 0;
playlist.length = 0;


// retrieve data from xml with jQuery.ajax method 
$.ajax({
	type: "GET",
	url: "./xml/metadata.xml",
	dataType: "xml",

		success: function(xml){
		$(xml).find('clip').each(function(){
		
		    pos_begin = $(this).find('pos_vorne').text();
	    	    pos_middle = $(this).find('pos_mitte').text();
	    	    pos_end = $(this).find('pos_hinten').text();
	    	    attrXML[0] = $(this).find('abenteuer').text();
		    attrXML[1] =  $(this).find('geborgenheit').text();
		    attrXML[2] = $(this).find('koer_genuss').text();
		    attrXML[3] =  $(this).find('kulin_genuss').text();
		    attrXML[4] =  $(this).find('chance').text();
		    attrXML[5] =  $(this).find('geselligkeit').text();
	    	    name = $(this).find('name').text();

		    // get suitable videos for the beginning
		    for(i = 0; i < attr.length; i++){
		    
			    if (attrXML[i] == attr[i] && pos_begin == "true") {
			    begin.push(name);
			    }
		    
		    } // end for

		    // get suitable videos for the middlepart
		    for(i = 0; i < attr.length; i++){
		    
			    if (attrXML[i] == attr[i] && pos_middle == "true") {
			    middle.push(name);
			    }
		    
		    } // end for

		    // get suitable videos for the end
		    for(i = 0; i < attr.length; i++){
		    
			    if (attrXML[i] == attr[i] && pos_end == "true") {
			    end.push(name);
			    }
		    
		    } // end for


		    console.log("begin:", begin);
		    console.log("middle", middle);
		    console.log("end", end);



	            var uniqueBegin = begin.filter(function(elem, pos) {
    			return begin.indexOf(elem) == pos;
  		    }); // end uniquePlaylist 

	            var uniqueMiddle = middle.filter(function(elem, pos) {
    			return middle.indexOf(elem) == pos;
  		    }); // end uniquePlaylist 

	            var uniqueEnd = end.filter(function(elem, pos) {
    			return end.indexOf(elem) == pos;
  		    }); // end uniquePlaylist 


		    console.log("--------------");

		     // scramble chosen values from generated position-arrays and put them into respective positions of our playlist 
		    

		    random_Begin = begin[Math.floor(Math.random() * uniqueBegin.length)];		    
		    playlist[0] = random_Begin;

		    random_Middle = middle[Math.floor(Math.random() * uniqueMiddle.length)];
		    playlist[1] = random_Middle;

		    random_Middle2 =  middle[Math.floor(Math.random() * uniqueMiddle.length)];
		    playlist[2] = random_Middle;

		    random_End = end[Math.floor(Math.random() * uniqueEnd.length)];
		    playlist[3] = random_End;
		    


		    // no-surprise version: every ticket generates unique playlist
		    /*
		    playlist.push.apply(playlist, begin);
		    playlist.push.apply(playlist, middle);
		    playlist.push.apply(playlist, end);
		    */		    
		    // remove empty, undefined cells from playlist
		    /*
		    playlist = playlist.filter(function(n){ return n != undefined });
	            */
		    // removing dublicates from final playlist


	            var uniquePlaylist = playlist.filter(function(elem, pos) {
    			return playlist.indexOf(elem) == pos;
  		    }); // end uniquePlaylist



		    console.log("playlist:", playlist);
		    console.log("filtered playlist:", uniquePlaylist);



		    console.log("Ticket:", attr[0], attr[1], attr[2], attr[3], attr[4], attr[5]);
		
		
		})
		
	$("#playlist").html(""); // clear old elements before .append new ones
	$("#playlist").append('<br>'+playlist[0]+'<br>' +playlist[1]+ '<br>' +playlist[2]+ '<br>' +playlist[3]+'<br>');


		}, // end function(xml)
		
		error: function(){ 
			alert("something's wrong Diane");
		} // end error handler


}); // end $.ajax
}); // end .click(function(event)


}) //end jQuery


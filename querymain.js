// metamachine with jQuery

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
uniqueBegin.length = 0;
uniqueMiddle.length = 0;
uniqueEnd.length = 0;


// retrieve data from xml with jQuery.ajax method 
$.ajax({
	type: "GET",
	url: "./xml/metadata.xml",
	dataType: "xml",

		success: function(xml){
		$(xml).find('clip').each(
			function(){
		
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
			    

			    /*
			    for(i = 0; i < attr.length; i++){
			    
				    if (attrXML[i] == attr[i] && pos_begin == "true") {
				    begin.push(name);
				    }
				    else if (attrXML[i] == attr[i] && pos_middle == "true") {
				    middle.push(name);
				    }
				    else if (attrXML[i] == attr[i] && pos_end == "true") {
				    end.push(name);
				    }
			    
			    } // end for
			    */


				console.log("--------------");
			    console.log("begin:", begin);
			    console.log("middle", middle);
			    console.log("end", end);


				// list already doesn't contain duplicates, so this part is not needed
			    
		        uniqueBegin = begin.filter(function(elem, pos) {
	    			return begin.indexOf(elem) == pos;
	  		    	}); // end uniquePlaylist 

		        uniqueMiddle = middle.filter(function(elem, pos) {
	    			return middle.indexOf(elem) == pos;
	  		    	}); // end uniquePlaylist 

		        uniqueEnd = end.filter(function(elem, pos) {
	    			return end.indexOf(elem) == pos;
	  		    	}); // end uniquePlaylist 

			    console.log("-------");
				

			}) // end each

		     // scramble chosen values from generated position-arrays and put them into respective positions of our playlist
		     // after each filling the last item is excluded from the next respective array
		    
		    random_Begin = uniqueBegin[Math.floor(Math.random() * begin.length)];		    
		    playlist[0] = random_Begin;
			uniqueMiddle = $.grep(uniqueMiddle, function(value) { return value != random_Begin; }); // see http://stackoverflow.com/questions/3596089

		    for(i = 1; i < 3; i++){
			    
				random_Middle = uniqueMiddle[Math.floor(Math.random() * uniqueMiddle.length)];
		    	playlist[i] = random_Middle;
		    	uniqueMiddle = $.grep(uniqueMiddle, function(value) { return value != random_Middle;});
			    
			}

		    uniqueEnd = $.grep(uniqueMiddle, function(value) { return value != random_Middle; });
		    random_End = uniqueEnd[Math.floor(Math.random() * uniqueEnd.length)];
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

		    /*
	        var uniquePlaylist = playlist.filter(function(elem, pos) {
    			return playlist.indexOf(elem) == pos;
  		    	}); // end uniquePlaylist
			*/


	        console.log("-------");
		    console.log("playlist:", playlist);
		    console.log("Ticket:", attr[0], attr[1], attr[2], attr[3], attr[4], attr[5]);
		    console.log("--------------");
		

		
			$("#playlist").html(""); // clear old elements before .append new ones
			for(i = 0; i < playlist.length; i++){
			    
				$("#playlist").append('<br>'+playlist[i]);

			}

	
	        // Lifemirror Player
	        var player = new LifemirrorPlayer();
	        var url = window.location.href; // returns URL
	        var dir = url.substring(0, url.lastIndexOf('/'));  // returns directury only
	       
		        player.initialise(playlist, "film", dir+"/vid/", null);  // see LifemirrorPlayer.js lines 12—17
		        player.preloadVideos();

		}, // end success: function(xml)
		
		error: function(){ 
			alert("something's wrong Diane");
		} // end error handler


}); // end $.ajax
}); // end .click(function(event)


}) //end jQuery


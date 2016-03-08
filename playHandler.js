//
// parse playlist positions from URL and starts Player
// Martin Stelter
//
//

$(document).ready(function(){

var playlist = [];

// Fetch indexes out of URL
var url = window.location.href; // returns URL
var ticket = url.split('tck=')[1]; // return ticket as 1 string
ticket = ticket.split('-');
var indexes = url.substring( url.lastIndexOf('ixs=')+4, url.lastIndexOf('tck=')-1 ); // returns indexes as 1 string
console.log("indexes", indexes);
indexes = indexes.split('-'); // splits id into array of playlist indexes


$.ajax({
	type: "GET",
	url: "./xml/metadata.xml",
	dataType: "xml",

		success: function(xml){

		
		// Fetch file names out of XML
		for(i = 0; i < indexes.length; i++) {
			playlist[i] = $('name:eq( '+indexes[i]+' )',xml).text();
		}
		console.log("playlist", playlist);


		// Lifemirror Player
	    var player = new LifemirrorPlayer();
	    var url = window.location.href; // returns URL
	    var dir = url.substring(0, url.lastIndexOf('/'));  // returns directury only
	       
		    player.initialise(playlist, "film", dir+"/vid/", null);  // see LifemirrorPlayer.js lines 12—17
		    player.preloadVideos();

		// Build UI
		var d = '<div id="ticket">';
		var dc = '</div>';
		var showTicket = d + "Liebe: " + ticket[0] + dc
					   + d + "Glück: " + ticket[1] + dc
					   + d + "Tradition: " + ticket[2] + dc
					   + d + "Abenteuer: " + ticket[3] + dc
					   + d + "Perfektion: " + ticket[4] +dc;
	    document.getElementById('ticketBox').innerHTML = showTicket;

	    // Show End Screen
	    document.addEventListener("videosEnded", function(e) { // triggerd by LifemirrorPlayer.js
        	document.getElementById('end').style.display = 'inline';
    	});

		}, // end success: function(xml)
		
		error: function(){ 
			alert("something's wrong Diane");

		} // end error handler


}); // end $.ajax
}) //end jQuery


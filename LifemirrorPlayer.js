/**
 * A classy way to play HTML5 videos on a loop without gaps
 * @author LifeMirror http://www.lifemirror.org/
 * @constructor
 * 
 * modifications done by Project_MetaJS
 */
function LifemirrorPlayer() {}
var Lifemirror = {};
var countContainer = 0;
var idx = 0;

/**
 * @param playlist An array of URLs to be played - see documentation for details
 * @param container The HTML ID of the element to insert videos into
 * @param baseurl The base URL to append to videos
 * @param options A list of additional <video> options, if any
 */
LifemirrorPlayer.prototype.initialise = function(playlist, container, baseurl, options) {
    Lifemirror.playlist   = playlist;
    Lifemirror.container  = container;
    Lifemirror.baseurl    = baseurl;
    Lifemirror.options    = options;
    Lifemirror.preloaded  = 0;
}


LifemirrorPlayer.prototype.preloadVideos = function() {
    console.log("Lifemirror.preloadVideos");
    
    // Clear canvas
    document.getElementById(Lifemirror.container).innerHTML = "";
    idx = 0;
    countContainer = 0;

    // Write code for the 1st 4 videos to play
    // They serve as containers for following videos to play
    for(i = 0; i < 4; i++)
    {
        // Prepare HTML to insert
        // This is necessary to prevent the browser closing tags
        var htmlToInsert = "<video height='100%' width='100%' preload oncanplaythrough='LifemirrorPlayer.preloaderCallback()' onended='LifemirrorPlayer.nextVideo()' id='"+i+"' style='display:none'"+Lifemirror.options+">";
            htmlToInsert += "<source src='"+Lifemirror.baseurl+Lifemirror.playlist[idx+i]+"' type='video/mp4'>";
            //htmlToInsert += "<source src='"+Lifemirror.baseurl+Lifemirror.playlist[idx+i]+"' type='video/ogg'>";
            htmlToInsert += "</video>";

        // Insert the HTML
        document.getElementById(Lifemirror.container).innerHTML += htmlToInsert;
    }
}

LifemirrorPlayer.startPlaying = function() {
    console.log("LifemirrorPlayer.startPlaying");
    
    var object = document.getElementById(countContainer);
        object.style.display = 'inline';
        object.play();

}

LifemirrorPlayer.nextVideo = function() {
    
    console.log("idx", idx);
    console.log("Lifemirror.playlist.length", Lifemirror.playlist.length);
    
    // Counts pointer in playlist for next video
    idx++;

    // As long as there are videos to play...
    if (idx < Lifemirror.playlist.length) {

        // Hide last container
        document.getElementById(countContainer).style.display = 'none';

        // Counts so we know which container to use next
        if (countContainer <= 2) {
            countContainer++;
        } else {
            countContainer = 0;
        }
        console.log("countContainer", countContainer);

        // Set up next container
        document.getElementById(countContainer).style.display = 'inline';
        document.getElementById(countContainer).play();


        // If there still are videos to preload...
        if (Lifemirror.playlist.length - (idx+3) > 0) {
            var video = document.getElementsByTagName('video')[ (countContainer+3)%4 ];
            var sources = video.getElementsByTagName('source');
            console.log("changing source");
            console.log(sources);
            sources[0].setAttribute("src", Lifemirror.baseurl+Lifemirror.playlist[idx+3]);
            video.load();
            //sources[1].setAttribute("src", Lifemirror.baseurl+Lifemirror.playlist[idx+3]);
        }
    }

}


LifemirrorPlayer.preloaderCallback = function() {
    Lifemirror.preloaded++;
    if(Lifemirror.preloaded >= 3) this.startPlaying();
}
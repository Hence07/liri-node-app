require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");

var input = process.argv[2];
var mySearch = process.argv[3];

startLiri(mySearch, input);


function startLiri(searchValue, command) {
    for (var i = 4; i < process.argv.length; i++) {
        if (i < process.argv.length) {
            mySearch = mySearch + " ";
        }
       mySearch = mySearch + process.argv[i];
    }
    doSearch(mySearch, input);
}

function doSearch(mySearch, input) {
    switch (input) {
        case 
        "concert-this":
            bandsInTown(mySearch);
            break;
        case "spotify-this-song":
            spotifyThisSong(mySearch);
           
            break;
        case "movie-this":
            movieThis(mySearch);
            
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log(input + ": Don't recongnize this input");
    }
}
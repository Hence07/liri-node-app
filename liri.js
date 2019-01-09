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

function spotifyThisSong(track) {

    if (typeof track === 'undefined') {
        track = "The Sign"
    }
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({
        type: 'track',
        query: track,
        limit: 10
    }, function (err, data) {
        if (err) {
            return console.log('Error here  occurred: ' + err);
        }
        for (var x = 0; x < data.tracks.items.length; x++) {
            var info = data.tracks.items[x];
            console.log(`Song title: ${info.name}`) //title
            console.log(`Album title: ${info.album.name}`)
            console.log(`Preview Url: ${info.preview_url}`)

            for (var xy = 0; xy < info.artists.length; xy++) {
                console.log(`Artist(s): ${info.artists[xy].name}`); //artist                
            }
            console.log("\n");
        }
    });
}

function movieThis(search) {
    if (typeof search === 'undefined') {
        search = "Scarface"
    }

    var queryUrl = `http://www.omdbapi.com/?t=${search}&apikey=10a8aceb`;
    // console.log(queryUrl)
    axios
        .get(queryUrl)
        .then(function (response) {
            var res = response["data"];
            console.log("Title: " + res.Title);
            console.log("Released: " + res.Released);
            console.log("IMDB Ratings: " + res.imdbRating);
            res.Ratings.find(function (element) {
                if ((element)["Source"] == "Rotten Tomatoes") {
                    console.log("Rotten Tomatoes: " + (element)["Value"])
                }
            });
            console.log("Country of Origin: " + res.Country);
            console.log("Language: " + res.Language);
            console.log("Plot: " + res.Plot);
            console.log("Actors: " + res.Actors);

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log("Error", error.message);
            }
            console.log(error.config);
        });

//creating a function with artist as parameters to handle searches.
function bandsInTown(artist) {
    var queryUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
    // console.log(queryUrl);
    axios
        .get(queryUrl)
        .then(function (response) {
            // Object.keys(response).forEach(key => {        
            // console.log(response["data"]);
            //}
            var length = response["data"].length;
            if (length == 0) {
                console.log(`No events found for: ${artist}`);
            } else {
                for (var x = 0; x < length; x++) {
                    var venue = response["data"][x].venue;
                    var date = response["data"][x].datetime;
                    console.log("Name of the venue: " + venue.name);
                    console.log("Venue city: " + venue.city);
                    if (venue.region) {
                        console.log("Region: " + venue.region)
                    }
                    console.log("Country: " + venue.country);
                    console.log("Date: " + date.slice(0, 4) + '/' + date.slice(5, 7) + '/' + date.slice(8, 10))
                    console.log('\n');
                }
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // We would have to make a function with params search 
                //Require fs to be able to read and write file
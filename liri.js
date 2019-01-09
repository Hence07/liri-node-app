require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");

var input = process.argv[2];
var mySearch = process.argv[3];


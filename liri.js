//require the dotenv module
require("dotenv").config();

//require the spotify module
var Spotify = require("node-spotify-api");

//loads the exported pieces from keys.js
let keys = require("./keys.js");
//variable that lets us access the spotify key
let spotify = new Spotify(keys.spotify);

//take in the command
let command = process.argv[2];

//take in the comman modifier
let modifier = process.argv[3];

//FUNCTIONS=====================================

//the spotify API function
function spotifyThis(song) {
    // console.log('this is the song you wanted: ' + song);
    spotify
        .search({ type: 'track', query: song })
        .then(function(response) {
            //grabs the first search result
            let firstResponse = response.tracks.items[0]
            //stores the name of the artist
            let artist=firstResponse.artists[0].name;
            console.log(artist);
            //stores the full name of the song
            let name = firstResponse.name;
            console.log(name);
            //stores the external web link
            let link= firstResponse.external_urls.spotify;
            console.log(link);
            //stores the album name
            let albumName = firstResponse.album.name;
            console.log(albumName);
            
        })
        .catch(function(err) {
            console.log(err);
        })
}

//the Bands In Town API Function
function concertThis(artist) {
    console.log('this is the artist you wanted: ' + artist);
}

//the OMDB API function
function movieThis(movie) {
    console.log('this is the movie you wanted: ' + movie);
}

//the do-what-it-says function
function doRandomThis(a, b) {
    console.log("this is the command you entered: " + a);
    console.log("this is the modifier you entered: " + b);

}

//liri bot execution
function liriRun(param1, param2) {
    // console.log(command + modifier);
    switch (param1) {
        //if spotify-this-song is process.argv[2]
        case 'spotify-this-song':
            spotifyThis(param2);
            break;

        // if concert-this is process.argv[2]
        case 'concert-this':
            concertThis(param2);
            break;

        //if movie-this is process.argv[2]
        case 'movie-this':
            movieThis(param2);
            break;

        //if do-what-it-says is process.argv[2]
        case 'do-what-it-says':
            doRandomThis(param1, param2);
            break;

        //default case
        default:
            console.log("don't be dumb");
            break;
    }
}
//MAIN PROCESSESS==============================
//initiates the LiriBot
liriRun(command, modifier);
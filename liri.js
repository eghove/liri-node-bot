//require the dotenv module
require("dotenv").config();

//require the axios module
let axios = require("axios");

//require the spotify module
var Spotify = require("node-spotify-api");

//loads the exported pieces from keys.js
let keys = require("./keys.js");

//require moment.js
var moment = require("moment");

//variable that lets us access the spotify key
let spotify = new Spotify(keys.spotify);

//grab the fs node package
let fs = require("fs");

//take in the entire command line
let argument = process.argv;

//take in the command
let command = argument[2];

//take in the command modifier, everything position 3 and after
let modifier = argument.slice(3).join(" ");

//FUNCTIONS=====================================

//function that appends the commands to log.txt
function logCommands(param1, param2) {
    fs.appendFile ("log.txt", "\n" + "\n" + "Command: " + param1 + "," + " Modifier: " + param2 + ";", function(err) {
        if (err) {
          return console.log(err);
        }
      });
}

//function that appends the various outputs to log.txt
function logOutput (output) {
    fs.appendFile ("log.txt", "\n" + output, function(err) {
        if (err) {
          return console.log(err);
        }
      });
}

//the spotify API function
function spotifyThis(song) {
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            //grabs the first search result
            let firstResponse = response.tracks.items[0]
            //stores, modifies, displays, and logs the name of the artist
            let artist = firstResponse.artists[0].name;
            artist = "Artist(s): " + artist
            console.log(artist);
            logOutput(artist);
            //stores, modifies, displays, and logs the full name of the song
            let name = firstResponse.name;
            name = 'Name of Song: ' + name;
            console.log(name);
            logOutput(name);
            //stores, modifies, displays, and logs the external web link
            let link = firstResponse.external_urls.spotify;
            link = 'Spotify Link: ' + link;
            console.log(link);
            logOutput(link);
            //stores, modifies, displays, and logs the album name
            let albumName = firstResponse.album.name;
            albumName = 'Album Name: ' + albumName;
            console.log(albumName);
            logOutput(albumName);
        })
        .catch(function (err) {
            console.log(err);
        })
}

//the Bands In Town API Function
function concertThis(artist) {
    //pulls in the API key for Bands in Town
    const token = keys.bands.id;
    //if there are any spaces in the process.argv[3], it changes them to something the web can use.
    let artistParam = artist.replace(" ", "%20");
    //base url
    const baseURL = "https://rest.bandsintown.com/artists/"
    //building the query url
    let queryURL = baseURL + artistParam + "/events?app_id=" + token;
    //initiate the axios call
    axios.get(queryURL)
        .then(function (response) {
            //grabs the data and assigns it to allConcerts
            let allConcerts = response.data;
            for (let i = 0; i < allConcerts.length; i++) {
                //terminal separator
                console.log("==========================================");
                //response number
                let concertNumber = i+1;
                console.log(artist + " Concert #" + concertNumber + ":");
                //capture the venue information
                let concertVenue = allConcerts[i].venue.name;
                //display the venue information
                console.log("Venue: " + concertVenue);
                //capture the venue location information
                let venueCity = allConcerts[i].venue.city;
                let venueRegion = allConcerts[i].venue.region;
                let venueCountry = allConcerts[i].venue.country;
                //display it all to the terminal
                console.log("Location: " + venueCity + ", " + venueRegion + ", " + venueCountry);
                //capture the date information
                let concertDate = allConcerts[i].datetime;
                //transforming concertDate to drop the time and keep the date in euro format
                concertDate = concertDate.substring(0, 10);
                //transforming concertDate further using moment.js
                concertDate = moment(concertDate).format('MM/DD/YYYY');
                //display the concertDate in the terminal
                console.log("Date: " + concertDate);
                //terminal separator
                console.log("==========================================");
            }
        }

        )
        .catch(function (err) {
            console.log(err);
        })


}

//the OMDB API function
function movieThis(movie) {
    //pulling in the omdb token
    const token = keys.omdb.id;
    //if there are any spaces in the modifier, it changes them to something the web can use.
    let movieParam = movie.replace(" ", "%20");
    //the OMDB base url
    const baseURL = "http://www.omdbapi.com/?t="
    //set up the query url
    let queryURL = baseURL + movieParam + "&apikey=" + token;
    axios.get(queryURL)
        .then(function (response) {
            //grabs the data and assigns it to movieData
            let movieData = response.data;
            //grab the movie title
            let movieTitle = movieData.Title;
            //grab the release year
            let movieReleaseYear = movieData.Year;
            //grab the IMDB rating
            let movieIMDB = movieData.Ratings[0].Value;
            //grab the rotten tomatoes rating
            let movieRotten = movieData.Ratings[1].Value;
            //grab the location where the movie was produced
            let movieLocation = movieData.Country;
            //grab the language of the move
            let movieLang = movieData.Language;
            // grab the plot of the movie
            let moviePlot = movieData.Plot;
            //grab the actors in the movie
            let movieCast = movieData.Actors;


            //terminal separator
            console.log("==========================================");
            //display all of the above to the terminal
            console.log("Movie Tite: " + movieTitle);
            console.log("Released: " + movieReleaseYear);
            console.log("IMDB Rating: " + movieIMDB);
            console.log("Rotten Tomatoes Rating: " + movieRotten);
            console.log("Country of Production: " + movieLocation);
            console.log("Language: " + movieLang);
            console.log("Plot: " + moviePlot);
            console.log("Actors: " + movieCast);
            //terminal separator
            console.log("==========================================");
        }

        )
        .catch(function (err) {
            console.log(err);
        })

}

//the do-what-it-says function
function doRandomThis() {
    
    //reading the random.txt file
    fs.readFile("random.txt", "utf8", function(error, data) {
        //error handling
        if (error) {
            return console.log(error);
        }
        //turns the text in random.txt into an array
        let dataArr = data.split(",");
        //assigns the first item to the command variable
        command = dataArr[0];
        //assisgns the second item to the modifier variable
        modifier = dataArr[1];
        //executes the liriRun function
        console.log(command);
        console.log(modifier);
        liriRun(command, modifier);
    })

    

}

//liri bot execution
function liriRun(param1, param2) {
    //logs the commands
    logCommands(param1, param2);
    switch (param1) {

        //if spotify-this-song is command
        case 'spotify-this-song':
            //if nothing is entered after the command, defaut to this
            if (!param2) {
                spotifyThis("Ace of Base");
            } else {
                spotifyThis(param2);
            }
            break;

        // if concert-this is command
        case 'concert-this':
            concertThis(param2);
            break;

        //if movie-this is command
        case 'movie-this':
            //if nothing is entered after the command, defaut to this
            if (!param2) {
                movieThis("Mr. Nobody");
            } else {
                movieThis(param2);
            }
            break;

        //if do-what-it-says is command
        case 'do-what-it-says':
            doRandomThis();
            break;

        //default case
        default:
            console.log("Don't be dumb! Give me something I can work with!");
            break;
    }
}
//MAIN PROCESSESS==============================
//initiates the LiriBot
liriRun(command, modifier);
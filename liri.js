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

//pulling in the opn launcher module
const opn = require('opn');

//pulling in the prompt-confirm module
const Confirm = require('prompt-confirm');

//take in the entire command line
let argument = process.argv;

//take in the command
let command = argument[2];

//take in the command modifier, everything position 3 and after
let modifier = argument.slice(3).join(" ");

//the console separator
const separator = "\n==========================================";

//FUNCTIONS=====================================

//function that appends the commands to log.txt
function logCommands(param1, param2) {
    fs.appendFile("log.txt", "\n" + "\n" + "Command: " + param1 + "," + " Modifier: " + param2 + ";", function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

//the spotify API function
function spotifyThis(song) {
    let songQuery = song.toString();
    spotify
        .search({ type: 'track', query: songQuery })
        .then(function (response) {
            //grabs the first search result
            let firstResponse = response.tracks.items[0]
            //stores, modifies, displays, and logs the name of the artist
            let artist = firstResponse.artists[0].name;
            artist = "\nArtist(s): " + artist

            //stores, modifies, the full name of the song
            let name = firstResponse.name;
            name = '\nName of Song: ' + name;

            //stores, modifies, the external web link
            let link = firstResponse.external_urls.spotify;
            let displayLink = '\nSpotify Link: ' + link;

            //stores, modifies, the album name
            let albumName = firstResponse.album.name;
            albumName = '\nAlbum Name: ' + albumName;

            //displays everything to the terminal
            console.log(artist + name + displayLink + albumName + "\n");

            //logs it all in the log.txt file
            fs.appendFile("log.txt", artist + name + displayLink + albumName, function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            //asks the user if they'd like to play this song in their browser
            const prompt = new Confirm({
                name: 'playSong',
                message: 'Would you like to play this song in your browser?'
            })
            prompt.ask(function (answer) {
                if (answer) {
                    //if answer is true, then open the spotify link
                    opn(link);
                } else return;
            })
            // 

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

            //checks to make sure there are actually results. If so, does the below
            if (allConcerts.length > 0) {
                //grabs the ticketing URL for the first show
                let infoUrl = allConcerts[0].url;
                for (let i = 0; i < allConcerts.length; i++) {

                    //stores, modifies, the concert number
                    let concertNumber = i + 1;
                    concertNumber = '\n' + artist.toUpperCase() + " Concert #" + concertNumber + ":";

                    //stores, modifies, the venue information
                    let concertVenue = allConcerts[i].venue.name;
                    concertVenue = "\nVenue: " + concertVenue;

                    //stores, modifies, the venue location information
                    let venueCity = allConcerts[i].venue.city;
                    let venueRegion = allConcerts[i].venue.region;
                    let venueCountry = allConcerts[i].venue.country;
                    let location;

                    //handles whether or not anything is in venueRegion, changes display appropriately
                    if (venueRegion.length > 0) {
                        location = "\nLocation: " + venueCity + ", " + venueRegion + ", " + venueCountry;
                    } else { location = "\nLocation: " + venueCity + ", " + venueCountry; }


                    //stores, modifies, the date information
                    let concertDate = allConcerts[i].datetime;
                    concertDate = concertDate.substring(0, 10); //transforming concertDate to drop the time and keep the date in euro format
                    concertDate = moment(concertDate).format('MM/DD/YYYY'); //transforming concertDate further using moment.js
                    concertDate = "\nDate: " + concertDate;

                    //display everything in terminal
                    console.log(separator + concertNumber + concertVenue + location + concertDate + separator);

                    //logs it all in the log.txt file
                    fs.appendFile("log.txt", separator + concertNumber + concertVenue + location + concertDate + separator, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });


                }
                //asks the user if they'd like to purchase a ticket to the first show in their browser
                const prompt = new Confirm({
                    name: 'buy ticket',
                    message: 'Would you like to open your browser to purchase a ticket to the first concert?'
                })
                prompt.ask(function (answer) {
                    if (answer) {
                        //if answer is true, then open the spotify link
                        opn(infoUrl);
                    } else return;
                })
                //if no concerts found, does this:
            } else {
                console.log('No concerts found');

                //logs it all in the log.txt file
                fs.appendFile("log.txt", "\nNo concerts found", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
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

            //checks to make sure movieData has results. If so, does this:
            if (movieData.Title) {

                //grab the movie title
                let movieTitle = movieData.Title;
                movieTitle = "\nMovie Tite: " + movieTitle;

                //grab the release year
                let movieReleaseYear = movieData.Year;
                movieReleaseYear = "\nReleased: " + movieReleaseYear;

                //grab the IMDB rating
                let movieIMDB = movieData.Ratings[0].Value;
                movieIMDB = "\nIMDB Rating: " + movieIMDB;

                //grab the rotten tomatoes rating
                let movieRotten = movieData.Ratings[1].Value;
                movieRotten = "\nRotten Tomatoes Rating: " + movieRotten;


                //grab the location where the movie was produced
                let movieLocation = movieData.Country;
                movieLocation = "\nCountry of Production: " + movieLocation;

                //grab the language of the move
                let movieLang = movieData.Language;
                movieLang = "\nLanguage: " + movieLang;

                // grab the plot of the movie
                let moviePlot = movieData.Plot;
                moviePlot = "\nPlot: " + moviePlot;

                //grab the actors in the movie
                let movieCast = movieData.Actors;
                movieCast = "\nActors: " + movieCast;

                //grab the poster link
                let moviePoster = movieData.Poster;

                //log all of this and display all of the this to the terminal
                console.log(separator + movieTitle + movieReleaseYear + movieIMDB + movieRotten + movieLocation + movieLang + moviePlot + movieCast + separator);


                //logs it all in the log.txt file
                fs.appendFile("log.txt", separator + movieTitle + movieReleaseYear + movieIMDB + movieRotten + movieLocation + movieLang + moviePlot + movieCast + separator, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });


                //asks the user if they'd like to view the poster in their browser
                const prompt = new Confirm({
                    name: 'poster',
                    message: 'Would you like to open your browser to view the movie poster?'
                })
                prompt.ask(function (answer) {
                    if (answer) {
                        //if answer is true, then open the movie poster link
                        opn(moviePoster);
                    } else return;
                })
            } else { 
                console.log("\nNo movie by that title found.");

                //logs it all in the log.txt file
                fs.appendFile("log.txt", "\nNo movie by that title found.", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

            };
        }

        )
        .catch(function (err) {
            console.log(err);
        })
}

//the do-what-it-says function
function doRandomThis() {

    //reading the random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
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
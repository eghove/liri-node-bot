# Welcome to LIRI Bot!
A helpful assistant built using Node.js that runs in your command terminal.

## What is LIRI Bot?
LIRI Bot is an assistant that can be accessed via the command line of a user's terminal. It was built using Node.js, JavaScript, and several free, open-sourced Node modules. LIRI Bot searches several API's for requested information and display that information in the user's terminal. With LIRI Bot, a user can do the following:
* Search Spotify for a song and display information about that song,
* Play the song found on Spotify in a new browser window,
* Search Bands in Town for upcoming performances by a band or artist and display those results,
* Take the user to the site in a new browser window where they may purchase tickets to the first upcoming performance,
* Search the Open Movie Database (OMDb) for a movie title and display those results,
* Display the movie poster for the movie found in a new browser window,
* Log all commands, queries, and results in a text file called log.txt, and
* Execute a pre-programmed search command located in a text file called random.txt.

## How do I Start Using LIRI Bot?
If you'd like to use LIRI Bot, please kindly follow the steps outlined below:
1. Ensure that you have Node.js installed on your local machine. If you need to install Node.js, please go here: https://nodejs.org/ .
1. Clone the LIRI Bot repository into a folder on your local machine. If you need more information about cloning GitHub repositories, please go here: https://help.github.com/articles/cloning-a-repository/ .
1. Once you've cloned the LIRI Bot repository into a folder on your local machine, please check to make sure you have the following files:
    1. keys.js
    1. liri.js
    1. random.txt
    1. package.json
    1. package-lock.json (?)
1. In order to use all of LIRI Bot's functionality, you will need to obtain API keys to the APIs listed below. Don't worry; they're free, but may take some time to respond to your request for an API.
    1. Spotify: https://developer.spotify.com/documentation/web-api/
    1. Bands in Town: https://manager.bandsintown.com/support/bandsintown-api
    1. Open Movie Database: http://www.omdbapi.com/
1. Use the terminal to navigate to the folder containing your local copy of LIRI Bot. Once you're there, type the following command in your terminal: `npm install`. This will install all of the Node modules necessary to make LIRI Bot work.
1. In the same local folder as LIRI Bot's other files, create a file called `.env`. This is where you'll store your API keys for use by the `keys.js` file.
1. Open your `.env` file in your favorite text editor (like Visual Studio Code) and replace the values below with your API key and token information. Make it look like the code below.
        
       
        SPOTIFY_ID=YOUR_SPOTIFY_ID
        SPOTIFY_SECRET=YOUR_SPOTIFY_API_KEY

        BANDSIT_ID=YOUR_BANDS_IN_TOWN_KEY

        OMDB_ID=YOUR_OPEN_MOVIE_DATABASE_KEY

1. You're all set to make LIRI Bot do your bidding!

## How do I Make LIRI Bot Obey Me?
Once LIRI Bot is set up, use your terminal navigate to the local folder containing the files that make up LIRI Bot. All commands to LIRI Bot must be issued in the terminal and begin with `node liri.js`. A full list of commands is below (without the <> signs):
* To search Spotify for a song: `node liri.js spotify-this-song <song title>`
* To search Bands In Town for upcoming performances by a band or artist: `node liri.js concert-this <band or artist>`
![concert-this demo](assets/concert-this.gif)
* To search OMDb for a movie by title: `node liri.js movie-this <movie title>`
* To execute the pre-programmed command in `random.txt` : `node liri.js do-what-it-says`


## What Node Modules does LIRI Bot Use?
LIRI Bot uses the following Node.js modules (and their embedded dependencies):
* axios,
* dotenv,
* moment,
* node-spotify-api,
* opn, and
* prompt-confirm.




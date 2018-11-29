# Welcome to LIRI Bot!
A helpful assistant built using Node.js that runs in your command terminal.

## What is LIRI Bot?
LIRI Bot is an assistant that can be accessed via the command line of a user's terminal. It was built using Node.js, JavaScript, and several free, open-sourced Node modules. LIRI Bot searches several API's for requested information and display that information in the user's terminal. With LIRI Bot, a user can do the following:
* Search Spotify for a song and display information about that song,
* Play the song found on Spotify in a new browser window,
* Search Bands in Town for upcoming performances by a band or artist and display those results,
* Take the user to the site in a new browser window where they may purchase tickets to the first upcoming performance,
* Search the Open Movie Database for a movie title and display those results,
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
1. 

## What Node Modules does LIRI Bot Use?
LIRI Bot uses the following Node.js modules (and their embedded dependencies):
* axios,
* dotenv,
* moment,
* node-spotify-api,
* opn, and
* prompt-confirm.




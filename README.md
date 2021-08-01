# WaterBot2020

A Twitter bot that reminds it's followers to drink some water!
It is currently deployed on Heroku, using a scheduler to post Tweets 30 minutes.
You may see it in action (using sentences in portuguese) [right here!](https://twitter.com/AguaBot2020)

## How does it work?

This bot was written in Node.js. It uses the [Twit](https://www.npmjs.com/package/twit) npm package to consume the Twitter API.
Basically, it is a script that posts a status to Twitter mentioning 3 of it's followers and saying a random sentence from a list of possible phrases about drinking water. The 3 mentioned followers are followers which haven't been mentioned in the bot's latest 4 tweets, preventing spam.
By using a scheduler, this script may run from time to time, posting multiple statuses every day.

## Folder structure

A brief explanation of this project's folder structure:

-   src
    -   config: JSON files containing the possible phrases (phrases.json) and the Twitter API access tokens (config.json).
    -   controllers: Functions which make requests to the Twitter API.
    -   utils: Utility functions which don't make any HTTP requests.
    -   index.js: The main script.

/*The Twitter validation tokens (config.js) as well as the phrases used (phrases.js)
and a function to get a random array element (rand.js) are placed in separate node 
modules, located on the 'my_modules' folder.*/
const Twit = require('twit');
const config = require('./my_modules/config');
const phrases = require('./my_modules/phrases');
const rand = require('./my_modules/rand'); 

const bot = new Twit(config.tokens);
console.log("Bot started.");

//Followers array
let followers = [];

//Stores the 4 last tweets in order to prevent spamming (tagging one follower too frequently)
let lastTweets = undefined;

//Gets the bot's last tweets
async function getLastTweets() {
    let tweets = await (await bot.get('statuses/user_timeline', { screen_name: config.screen_name })).data;
    lastTweets = [tweets[0].text,tweets[1].text,tweets[2].text,tweets[3].text] //From newest to oldest
}

//Returns a username not tagged in the last 4 tweets
function getValidUser() {
    let user = rand(followers);
    while (!isUserValid(user))
        user = rand(followers);
    return user;
}

//Returns a boolean value 
function isUserValid(user) {
    if (lastTweets[0].includes(user) || lastTweets[1].includes(user) || lastTweets[2].includes(user) || lastTweets[3].includes(user))
        return false;
    else
        return true;
}

//Updates lastTweets
function updateTweets (tweet) {
    lastTweets.pop();
    lastTweets.unshift(tweet);
}

//Updates the followers array
async function updateFollowers () {
    let query = await bot.get('followers/list', { screen_name: config.screen_name, count: 200 });
    followers = [];
    query.data.users.forEach(element => {
        followers.push(element.screen_name);
    });
}

//Post a new status (tweet)
async function postStatus (status) {
    let res = await bot.post('statuses/update', { status: status });
    return res;
}

//Status generation, based on getting random elements from the phrases module and random followers from Twitter.
function generateStatus () {
    let newPost = "";
    //Gets a random user from the followers array, removes it from the array and adds it to the newPost string.
    for (let i = 0; i < 3; i++){ 
        let user = getValidUser();
        while (newPost.includes(user)) //If the user is already present in the tweet, the bot gets another one
                user = getValidUser();
        if (user !== undefined && user !== null)
            newPost += `@${user} `;
    }
    newPost += `${rand(phrases)}`; //Adds one of the availible phrases to the string.
    return newPost;
}

/*This function calls the previous functions to generate and post a status and deals with the the post request's
success or failure*/ 
async function action () {
    let newPost = generateStatus();
    const res = await postStatus(newPost);
    if (res.err){
        console.log("Status couldn't be posted:\n" + res.err)
    }
    else {
        console.log("Status posted:\n" + newPost);
        updateTweets(newPost);
    }
}

async function init () {
    await updateFollowers();
    await getLastTweets();
    await action();
}

/*Initiate followers list and post the first tweet
Due to heroku, this will be called every 24 hours*/
init();
//Makes the action() function be executed every 50 minutes;
setInterval(action, 1000*60*50);
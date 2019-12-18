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

//Stores the last tweet in order to prevent spamming (tagging one follower two times in a row)
let lastTweet = undefined;

//Get all of the bot's followers
async function getFollowers () {
    let query = await bot.get('followers/list', { screen_name: config.screen_name });
    followers = [];
    query.data.users.forEach(element => {
        followers.push(element.screen_name);
    });
    return followers;    
}

//Gets the bot's last tweet
async function getLastTweet() {
    let tweets = await (await bot.get('statuses/user_timeline', { screen_name: config.screen_name })).data;
    lastTweet = tweets[0].text;
}

//Updates the followers array
async function updateFollowers () {
    followers = await getFollowers();
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
        let user = rand(followers);
        if (lastTweet != undefined) 
            while (lastTweet.includes(user)) //If the user has been tagged in the last tweet, he wont be tagged again
                user = rand(followers);
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
        lastTweet = newPost;
    }
}

async function init () {
    await updateFollowers();
    await getLastTweet();
    await action();
}

/*Initiate followers list and post the first tweet
Due to heroku, this will be called every 24 hours*/
init();
//Makes the action() function be executed every 1 hour.
setInterval(action, 1000*60*60);
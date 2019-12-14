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

//Get all of the bot's followers
async function getFollowers () {
    let query = await bot.get('followers/list', { screen_name: config.screen_name });
    followers = [];
    query.data.users.forEach(element => {
        followers.push(element.screen_name);
    });
    return followers;    
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
async function generateStatus () {
    let newPost = "";
    //Gets a random user from the followers array, removes it from the array and adds it to the newPost string.
    for (let i = 0; i < 3; i++){ 
        const user = rand(followers);
        followers = followers.filter(e => {return e !== user});
        if (user !== undefined && user !== null)
            newPost += `@${user} `;
    }
    newPost += `${rand(phrases)}`; //Adds one of the availible phrases to the string.
    return newPost;
}

/*This function calls the previous functions to generate and post a status and deals with the the post request's
success or failure*/ 
async function action () {
    let newPost = await generateStatus();
    const res = await postStatus(newPost);
    if (res.err){
        console.log("Status couldn't be posted:\n" + res.err)
    }
    else {
        console.log("Status posted:\n" + newPost);
    }
}

//First post after update
postStatus('Update message!');

//Initial followers list update
updateFollowers();
//Makes the action() function be executed every 1 hour.
setInterval(action, 1000*60*60);
//Updates the follower array every 4 hours
setInterval(updateFollowers, 1000*60*60*4 + 1000*60*20)
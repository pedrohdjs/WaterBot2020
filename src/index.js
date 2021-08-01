const { tokens, screen_name } = require("./config/config.json"),
	phrases = require("./config/phrases.json"),
	getLastTweets = require("./controllers/getLastTweets"),
	postTweet = require("./controllers/postTweet"),
	getFollowers = require("./controllers/getFollowers"),
	getMentionedUsers = require("./utils/getMentionedUsers"),
	generateStatus = require("./utils/generateStatus"),
	Twit = require("twit");

const twit = new Twit(tokens);

(async () => {
	const tweets = await getLastTweets(twit, screen_name);
	const mentionedUsers = getMentionedUsers(tweets);
	const mentionedUsersSet = new Set(mentionedUsers);

	const followers = await getFollowers(twit, screen_name);

	const status = generateStatus(phrases, followers, mentionedUsersSet);

	await postTweet(twit, status);
})();

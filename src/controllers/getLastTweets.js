/**
 * Gets the bot account's latest 4 tweets.
 * @param {Twit} twit a valid Twit instance
 * @param {String} screen_name the bot account's screen name
 * @returns {Array[String]} the account's latest 4 tweets text content
 */
module.exports = async (twit, screen_name) => {
	let tweets = await twit.get("statuses/user_timeline", {
		screen_name: screen_name,
		count: 4,
	});
	return tweets.data.map((tweet) => tweet.text);
};

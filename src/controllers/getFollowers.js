/**
 * Gets the bot account's followers (limited to 200)
 * @param {Twit} twit a valid Twit instance
 * @param {String} screen_name the bot account's screen name
 * @returns {Array[String]} the account's followers
 */
module.exports = async (twit, screen_name) => {
	let followers = await twit.get("followers/list", {
		screen_name: screen_name,
		count: 200,
	});
	return followers.data.users.map((user) => user.screen_name);
};

const getUsersToBeMentioned = require("./getUsersToBeMentioned");

/**
 * Generates a status ready for posting, mentioning users not on
 * the mentioned user set.
 * @param {Array[String]} phrases an array of phrases to be used
 * @param {Array[String]} followers an array containing the bot's followers
 * @param {Set[String]} mentionedUsersSet a set containing recently mentioned users
 * @returns {String} the generated status
 */
module.exports = (phrases, followers, mentionedUsersSet) => {
	const usersToBeMentioned = getUsersToBeMentioned(
		followers,
		mentionedUsersSet
	);
	const phrase = phrases[Math.floor(Math.random() * phrases.length)];
	return `@${usersToBeMentioned[0]} @${usersToBeMentioned[1]} @${usersToBeMentioned[2]}\n${phrase}`;
};

/**
 * Chooses 3 random users from followers which are not on mentionedUserSet
 * @param {Array[String]} followers an array containing the bot's followers
 * @param {Set[String]} mentionedUsersSet a set containing recently mentioned users
 * @returns {Array[String]} the users which should be mentioned in the next tweet
 */
module.exports = (followers, mentionedUsersSet) => {
	const usersToBeMentioned = [];
	for (let i = 0; i < 3; i++) {
		let user;
		do {
			user = followers[Math.floor(Math.random() * followers.length)];
		} while (mentionedUsersSet.has(user));
		usersToBeMentioned.push(user);
		mentionedUsersSet.add(user);
	}
	return usersToBeMentioned;
};

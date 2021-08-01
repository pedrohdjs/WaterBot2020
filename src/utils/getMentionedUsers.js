/**
 * Get all @mentions in an array of Strings
 * @param {Array[String]} statuses an array of tweet statuses
 * @returns {Array[String]} an array containing the mentioned users
 */
module.exports = (statuses) => {
	const users = statuses
		.map((status) => {
			const mentionRegExp = /([@][\w_-]+)/g;
			const matchedArr = [...status.matchAll(mentionRegExp)];
			return matchedArr.map((mention) => mention[0]);
		})
		.flat()
		.map((user) => user.replace("@", ""));
	return users;
};

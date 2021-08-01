/**
 * Posts a status to the bot's twitter account.
 * @param {Twit} twit a valid Twit instance
 * @param {String} status the status
 * @returns the twitter API's response to the post request
 */

module.exports = async (twit, status) => {
	return await twit.post("statuses/update", { status: status });
};

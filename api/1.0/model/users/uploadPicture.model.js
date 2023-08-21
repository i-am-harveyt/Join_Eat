import db from "../db.js";

const query = `UPDATE users SET picture=? WHERE id=UUID_TO_BIN(?);`;

/**
 * @param {string} url
 * @param {string} userId
 */
async function uploadPicture(userId, url) {
	const params = [url, userId];
	try {
		await db.execute(query, params);
	} catch (err) {
		throw err;
	}
}
export default uploadPicture;

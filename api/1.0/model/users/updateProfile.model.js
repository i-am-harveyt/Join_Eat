import db from "../db.js";
const query = `UPDATE users SET introduction=?, tags=? WHERE id=UUID_TO_BIN(?);`;
/**
 * @param {number} userId
 * @param {string} introduction
 * @param {string} tags
 */
async function updateProfile(userId, introduction, tags) {
	const params = [introduction, tags, userId];

	try {
		return await db.execute(query, params);
	} catch (err) {
		throw err;
	}
}
export default updateProfile;

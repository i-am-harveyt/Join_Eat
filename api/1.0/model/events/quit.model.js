import db from "../db.js";

const query = `
DELETE FROM participants
WHERE event_id=UUID_TO_BIN(?) AND user_id=UUID_TO_BIN(?)
AND (event_id) IN (
	SELECT id as event_id FROM events
	WHERE id=UUID_TO_BIN(?) AND host_id<>UUID_TO_BIN(?)
)`;

/**
 * @param {number} eventId
 * @param {number} userId
 */
export default async function eventQuit(eventId, userId) {
	console.log(eventId);
	console.log(userId);
	if (!(userId && eventId)) return false;

	const params = [eventId, userId, eventId, userId];

	try {
		return await db.execute(query, params);
	} catch (err) {
		throw err;
	}
}

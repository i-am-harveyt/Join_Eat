import db from "../db.js";

const participantsQuery = `
DELETE FROM participants
WHERE event_id=UUID_TO_BIN(?) AND user_id=UUID_TO_BIN(?)
`;

/**
 * @param {number} eventId
 * @param {number} userId
 */
export default async function eventQuit(eventId, userId) {
	if (!(userId && eventId)) return false;

	const participantsParams = [eventId, userId];

	try {
		return await db.execute(participantsQuery, participantsParams);
	} catch (err) {
		throw err;
	}
}

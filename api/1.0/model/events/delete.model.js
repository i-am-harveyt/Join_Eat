import db from "../db.js";

const eventsQuery = `
DELETE FROM events
WHERE id=UUID_TO_BIN(?) AND host_id=UUID_TO_BIN(?);
`;
const participantsQuery = `
DELETE FROM participants
WHERE event_id=UUID_TO_BIN(?) AND user_id=UUID_TO_BIN(?);
`;

/**
 * @param {number} eventId
 * @param {number} userId
 */
export default async function eventDelete(eventId, userId) {
	const eventsParams = [eventId, userId];
	const participantsParams = [eventId, userId];

	const conn = await db.getConnection();
	await conn.beginTransaction();
	try {
		const [result] = await conn.query(eventsQuery, eventsParams);
		if (!result.affectedRows) {
			await conn.rollback();
			conn.release();
			return false;
		}
		await conn.query(participantsQuery, participantsParams);
		await conn.commit();
	} catch (err) {
		await conn.rollback();
		conn.release();
		throw err;
	}
	return true;
}

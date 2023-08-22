import crypto from "crypto";
import db from "../db.js";
import getNow from "../../util/getNow.util.js";

const eventsQuery = `
INSERT INTO events(
id,
host_id,
name,
shop_name,
is_public,
latitude,
longitude,
appointment_time,
people_joined,
people_limit,
created_at)
VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, 0, ?, ?);
`;
const participantsQuery = `
INSERT INTO participants(id, user_id, event_id, join_at)
VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?);
`;

/**
 * @param {number} event_id: should be a uuid
 * @param {number} host_id
 * @param {string} event_name
 * @param {string} shop_name
 * @param {boolean} is_public
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} people_limit
 * @param {String} appointment_time
 */
export default async function eventCreate({
	event_id,
	host_id,
	event_name,
	shop_name,
	is_public,
	latitude,
	longitude,
	appointment_time,
	people_limit,
}) {
	const now = getNow();
	const participantsId = crypto.randomUUID();
	const eventsParams = [
		event_id,
		host_id,
		event_name,
		shop_name,
		is_public,
		latitude,
		longitude,
		appointment_time,
		people_limit,
		now,
	];
	const participantsParams = [participantsId, host_id, event_id, now];

	const con = await db.getConnection();
	try {
		await con.beginTransaction();
		await con.execute(eventsQuery, eventsParams);
		await con.execute(participantsQuery, participantsParams);
		await con.commit();
	} catch (err) {
		await con.rollback();
		con.release();
		throw err;
	}
	con.release();
}

import db from "../db.js";
const query = `
INSERT INTO events (
id,
host_id,
name,
shop_name,
is_public,
latitude,
longitude,
appointment_time,
people_limit)
VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?);
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
	const params = [
		event_id,
		host_id,
		event_name,
		shop_name,
		is_public,
		latitude,
		longitude,
		appointment_time,
		people_limit,
	];

	try {
		return await db.execute(query, params);
	} catch (err) {
		throw err;
	}
}

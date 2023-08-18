import db from "../db.js";

const query = `
WITH
attended_events_id AS (
	SELECT event_id FROM participants WHERE user_id=UUID_TO_BIN(?)
),
add_event_detail AS (
	SELECT
	BIN_TO_UUID(E.id) as id,
	E.name, E.shop_name, E.is_public,
	E.latitude, E.longitude, E.appointment_time,
	E.people_limit, E.people_joined, E.status
	FROM events E
	INNER JOIN attended_events_id A ON a.event_id=E.id
	WHERE E.host_id=UUID_TO_BIN(?) OR E.host_id=UUID_TO_BIN(?)
)
SELECT
A.*, 1 AS is_joined
FROM add_event_detail A ORDER BY appointment_time DESC;
`;

/**
 * @param {number} userId
 * @param {number} targetId
 */
export default async function fetchHistory(userId, targetId) {
	const param = [userId, userId, targetId];
	try {
		return await db.execute(query, param);
	} catch (err) {
		throw err;
	}
}

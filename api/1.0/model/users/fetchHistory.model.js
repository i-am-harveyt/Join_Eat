import db from "../db.js";

const query = `
WITH
target_attend_id AS (
	SELECT event_id FROM participants WHERE user_id=UUID_TO_BIN(?)
),
add_user_attend AS (
	SELECT B.event_id, P.user_id AS user_attended
	FROM target_attend_id B
	LEFT JOIN
	(SELECT event_id, user_id FROM participants WHERE user_id=UUID_TO_BIN(?)) P
	ON P.event_id=B.event_id
),
add_event_detail AS (
	SELECT
	BIN_TO_UUID(E.id) AS id,
	BIN_TO_UUID(E.host_id) AS host_id,
	CASE WHEN BIN_TO_UUID(A.user_attended) IS NULL THEN FALSE ELSE TRUE END AS is_joined,
	Floor(ST_Distance_Sphere(POINT(?, ?), POINT(longitude, latitude))) AS distance,
	E.name, E.shop_name, E.is_public,
	E.latitude, E.longitude, E.appointment_time,
	E.people_limit, E.people_joined, E.status
	FROM events E
	INNER JOIN add_user_attend A ON A.event_id=E.id
	WHERE E.is_public = TRUE
	OR
	A.user_attended IS NOT NULL
)
SELECT
A.*
FROM add_event_detail A
ORDER BY A.appointment_time DESC;
`;

/**
 * @param {number} userId
 * @param {number} targetId
 * @param {number} longitude 
 * @param {number} latitude 
 */
export default async function fetchHistory(
	userId,
	targetId,
	longitude,
	latitude,
) {
	const params = [targetId, userId, longitude, latitude];
	try {
		return await db.execute(query, params);
	} catch (err) {
		throw err;
	}
}

import db from "../db.js";

const participantsQuery = `
SELECT BIN_TO_UUID(P.user_id) as id, U.name, U.picture
FROM participants P
INNER JOIN users U ON P.user_id=U.id
WHERE P.event_id=UUID_TO_BIN(?)
`;
const eventQuery = `
WITH
event_participants_id AS (
	SELECT
	event_id,
	user_id AS participant_id
	FROM participants
	WHERE event_id=UUID_TO_BIN(?)
)
SELECT
BIN_TO_UUID(E.id) AS event_id,
BIN_TO_UUID(E.host_id) AS host_id,
E.name, E.shop_name, E.latitude, E.longitude,
E.people_limit, E.people_joined, E.appointment_time, E.is_public,
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(E.longitude, E.latitude))) AS distance,
CASE WHEN J.participant_id IS NOT NULL THEN 1 ELSE 0 END AS is_joined
FROM events E
LEFT JOIN event_participants_id J ON J.participant_id=UUID_TO_BIN(?)
WHERE E.id=UUID_TO_BIN(?);
`;

/**
 * @param {number} eventId
 * @param {number} userId
 * @param {number} longitude
 * @param {number} latitude
 */
export default async function eventDetail(eventId, userId, longitude, latitude) {
  const eventParams = [eventId, longitude, latitude, userId, eventId];
  const participantsParams = [eventId];

  const conn = await db.getConnection();
  let participantsData = null;
  let eventData = null;
  try {
    const [participantResult] = await conn.execute(
      participantsQuery,
      participantsParams,
    );
    let [eventResult] = await conn.execute(eventQuery, eventParams);
    participantsData = participantResult;
    eventData = eventResult;
  } catch (err) {
    db.releaseConnection();
    throw err;
  }
  db.releaseConnection();
	eventData[0].participants = participantsData;
  return eventData;
}

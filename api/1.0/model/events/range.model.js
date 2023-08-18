import db from "../db.js";

const rangeQuery = `
SELECT BIN_TO_UUID(id) AS event_id, BIN_TO_UUID(host_id) AS host_id, 
( SELECT picture FROM users WHERE users.id = events.host_id ) AS picture,
name, shop_name, latitude, longitude, people_limit, people_joined, appointment_time,
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(longitude, latitude))) AS distance,
( SELECT COUNT(*) FROM participants WHERE participants.user_id = UUID_TO_BIN(?) AND participants.event_id = events.id ) AS is_joined
FROM events
WHERE status=FALSE
HAVING distance <= 2000
ORDER BY distance
`;


/**
 * @param {string} user_id
 * @param {number} latitude
 * @param {number} longitude
 */
export default async function getNearbyEvents(user_id, latitude, longitude) {
  const params = [longitude, latitude, user_id]; // Note: longitude comes before latitude
  try {
    const [rows] = await db.execute(rangeQuery, params);
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  }
}

import db from "../db.js";

const searchQuery = `
SELECT BIN_TO_UUID(id) AS event_id, BIN_TO_UUID(host_id) AS host_id, 
( SELECT picture FROM users WHERE users.id = events.host_id ) AS picture,
name, shop_name, latitude, longitude, people_limit, people_joined, appointment_time, is_public
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(longitude, latitude))) AS distance,
( SELECT COUNT(*) FROM participants WHERE participants.user_id = UUID_TO_BIN(?) AND participants.event_id = events.id ) AS is_joined
FROM events
WHERE status=FALSE AND (name LIKE ? OR id=?) 
`;

/**
 * @param {string} user_id
 * @param {string} keyword
 * @param {number} latitude
 * @param {number} longitude
 */
export default async function searchEvents(user_id, keyword, latitude, longitude) {
  const params = [longitude, latitude, user_id, `%${keyword}%`, keyword]; // Matching keyword as event name or event ID
  try {
    const [rows] = await db.execute(searchQuery, params);
    return rows;
  } catch (err) {
    throw err;
  }
}

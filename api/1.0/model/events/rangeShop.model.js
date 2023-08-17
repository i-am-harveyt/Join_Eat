// ./model/events/search.model.js
import db from "../db.js";

const searchQuery = `
SELECT BIN_TO_UUID(id) AS event_id, name, shop_name, latitude, longitude, people_limit, people_joined, appointment_time,
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(?, ?))) AS distance,
( SELECT COUNT(*) FROM participants WHERE participants.user_id = UUID_TO_BIN(?) AND participants.event_id = events.id ) AS is_joined
FROM events
WHERE longitude=? AND latitude=?;
`;

/**
 * @param {string} user_id
 * @param {number} shop_latitude
 * @param {number} shop_longitude
 * @param {number} latitude
 * @param {number} longitude
 */
export default async function searchEvents(user_id, latitude, longitude, shop_latitude, shop_longitude) {
  const params = [longitude, latitude, shop_longitude, shop_latitude, user_id, shop_longitude, shop_latitude];
  try {
    const [rows] = await db.execute(searchQuery, params);
    return rows;
  } catch (err) {
    throw err;
  }
}

// ./model/events/search.model.js
import db from "../db.js";

const searchQuery = `
SELECT BIN_TO_UUID(id) AS event_id, BIN_TO_UUID(host_id) AS host_id, 
name, shop_name, latitude, longitude, people_limit, people_joined, appointment_time, is_public,
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(?, ?))) AS distance,
( SELECT COUNT(*) FROM participants WHERE participants.user_id = UUID_TO_BIN(?) AND participants.event_id = events.id ) AS is_joined
FROM events
WHERE longitude = CAST(? AS DECIMAL(10, 6)) AND latitude = CAST(? AS DECIMAL(10, 6)) AND is_public = TRUE AND status = FALSE ;
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

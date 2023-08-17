// ./model/events/search.model.js
import db from "../db.js";

const searchQuery = `
SELECT id AS event_id, name, shop_name, latitude, longitude, people_limit, people_joined, appointment_time,
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(longitude, latitude))) AS distance
FROM events
WHERE status=FALSE AND (name LIKE ? OR id=?) 
`;

/**
 * @param {string} keyword
 * @param {number} latitude
 * @param {number} longitude
 */
export default async function searchEvents(keyword, latitude, longitude) {
  const params = [longitude, latitude, `%${keyword}%`, keyword]; // Matching keyword as event name or event ID
  try {
    const [rows] = await db.execute(searchQuery, params);
    return rows;
  } catch (err) {
    throw err;
  }
}

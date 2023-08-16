// ./model/events/search.model.js
import db from "../db.js";

const searchQuery = `
SELECT id AS event_id, name, shop_name, latitude, longitude, people_limit, people_joined,
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(longitude, latitude))) AS distance
FROM events
WHERE status=FALSE AND (name LIKE ? OR id=?) 
`;

/**
 * @param {string} keyword
 * @param {number} lat
 * @param {number} lon
 */
export default async function searchEvents(keyword, lat, lon) {
  const param = [lon, lat, `%${keyword}%`, keyword]; // Matching keyword as event name or event ID
  try {
    const [rows] = await db.execute(searchQuery, param);
    return rows;
  } catch (err) {
    throw err;
  }
}

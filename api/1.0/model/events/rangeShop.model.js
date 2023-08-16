// ./model/events/search.model.js
import db from "../db.js";

const searchQuery = `
SELECT id AS event_id, name, shop_name, latitude, longitude, people_limit, people_joined,
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(?, ?))) AS distance
FROM events
WHERE longitude=? AND latitude=?;
`;

/**
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} lat
 * @param {number} lon
 */
export default async function searchEvents(lat, lon, latitude, longitude) {
  const param = [lon, lat, longitude, latitude, longitude, latitude];
  try {
    const [rows] = await db.execute(searchQuery, param);
    return rows;
  } catch (err) {
    throw err;
  }
}

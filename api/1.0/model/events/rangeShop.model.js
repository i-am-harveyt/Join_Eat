// ./model/events/search.model.js
import db from "../db.js";

const searchQuery = `
SELECT id AS event_id, name, shop_name, latitude, longitude, people_limit, people_joined,
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(?, ?))) AS distance
FROM events
WHERE longitude=? AND latitude=?;
`;

/**
 * @param {number} shop_latitude
 * @param {number} shop_longitude
 * @param {number} latitude
 * @param {number} longitude
 */
export default async function searchEvents(latitude, longitude, shop_latitude, shop_longitude) {
  const params = [longitude, latitude, shop_longitude, shop_latitude, shop_longitude, shop_latitude];
  try {
    const [rows] = await db.execute(searchQuery, params);
    return rows;
  } catch (err) {
    throw err;
  }
}

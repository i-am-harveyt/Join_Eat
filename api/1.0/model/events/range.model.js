import db from "../db.js";

const rangeQuery = `
SELECT id AS event_id, name, shop_name, latitude, longitude, people_limit, people_joined,
Floor(ST_Distance_Sphere(POINT(?, ?), POINT(longitude, latitude))) AS distance
FROM events
WHERE status=FALSE
HAVING distance <= 2000
ORDER BY distance
`;


/**
 * @param {number} latitude
 * @param {number} longitude
 */
export default async function getNearbyEvents(latitude, longitude) {
  const params = [longitude, latitude]; // Note: longitude comes before latitude
  try {
    const [rows] = await db.execute(rangeQuery, params);
    return rows;
  } catch (err) {
    throw err;
  }
}

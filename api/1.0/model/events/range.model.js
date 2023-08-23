import db from "../db.js";

const rangeQuery = `
SELECT BIN_TO_UUID(e.id) AS event_id, BIN_TO_UUID(e.host_id) AS host_id, e.is_public,
       e.name, e.shop_name, e.latitude, e.longitude, e.people_limit, e.people_joined, e.appointment_time,
       Floor(ST_Distance_Sphere(POINT(?, ?), POINT(e.longitude, e.latitude))) AS distance,
       IFNULL(p.user_id IS NOT NULL, 0) AS is_joined
FROM events e
LEFT JOIN participants p ON e.id = p.event_id AND p.user_id = UUID_TO_BIN(?)
WHERE e.status = FALSE 
      AND (e.is_public = TRUE OR p.user_id IS NOT NULL)
ORDER BY is_joined DESC, distance;
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
    return rows;
  } catch (err) {
    throw err;
  }
}

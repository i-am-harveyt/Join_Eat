import db from "../db.js";

const query = `
SELECT
BIN_TO_UUID(id) AS id, name, shop_name,
is_public, latitude, longitude,
created_at, appointment_time, people_limit,
people_joined, status
FROM events WHERE host_id=UUID_TO_BIN(?) ORDER BY appointment_time;
`;

/**
 * @param {number} userId
 */
export default async function fetchHistory(userId) {
  const param = [userId];
  try {
    return await db.execute(query, param);
  } catch (err) {
    throw err;
  }
}

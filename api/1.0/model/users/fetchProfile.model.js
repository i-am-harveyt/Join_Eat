import db from "../db.js";

const query = `
SELECT BIN_TO_UUID(id) AS id, name, email, picture, introduction, tags
FROM users
WHERE id=UUID_TO_BIN(?);
`;

/**
 * @param {number} userId
 * @param {number} targetId
 */
export default async function fetchProfile(userId, _targetId) {
  const param = [userId];
  try {
    const [result] = await db.execute(query, param);
    return result;
  } catch (err) {
    throw err;
  }
}

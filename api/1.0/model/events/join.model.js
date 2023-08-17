import getNow from "../../util/getNow.util.js";
import db from "../db.js";

const insertQuery = `
INSERT INTO participants(id, user_id, event_id, join_at)
VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?)
`;
const updateQuery = `
UPDATE events
SET people_joined = people_joined + 1
WHERE id=UUID_TO_BIN(?)
`;
/**
 * @param {string} uuid
 * @param {number} userId
 * @param {number} eventId
 */
export default async function eventJoin(uuid, userId, eventId) {
  const insertParams = [uuid, userId, eventId, getNow()];
  const updateParam = [eventId];

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute(updateQuery, updateParam);
    await connection.execute(insertQuery, insertParams);
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    db.releaseConnection();
    throw err;
  }
  db.releaseConnection();
  return eventId;
}

import getNow from "../../util/getNow.util.js";
import db from "../db.js";

const insertQuery = `
INSERT INTO participants(id, user_id, event_id, join_at)
VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?)
`;
/**
 * @param {string} uuid
 * @param {number} userId
 * @param {number} eventId
 */
export default async function eventJoin(uuid, userId, eventId) {
  const insertParams = [uuid, userId, eventId, getNow()];

  try {
    await db.execute(insertQuery, insertParams);
  } catch (err) {
    throw err;
  }
  return eventId;
}

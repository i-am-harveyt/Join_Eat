import crypto from "crypto";
import eventJoin from "../../model/events/join.model.js";
import {
  ECONNREFUSED,
  ER_DUP_ENTRY,
  ER_WRONG_VALUE_FOR_TYPE,
  EXCEED_PEOPLE_LIMIT,
} from "../../util/sqlErr.util.js";
import verifyJWT from "../../util/jwt/verify.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function eventJoinHandler(req, res, next) {
  let userId = 0;
  try {
    const result = verifyJWT(req.headers.authorization);
    userId = result.user_id;
  } catch (err) {
    return res.status(403).json({ error: "Wrong Token" });
  }

  const eventId = req.params.event_id;
  if (!eventId)
    return res.status(400).json({ error: "Required Parameter is Missing" });

  try {
    const uuid = crypto.randomUUID();
    await eventJoin(uuid, userId, eventId);
  } catch (err) {
    switch (err.errno) {
      case ECONNREFUSED.errno:
        return res.status(500).json({ error: ECONNREFUSED.message });
      case ER_DUP_ENTRY.errno:
        return res.status(403).json({ error: ER_DUP_ENTRY.message });
      case ER_WRONG_VALUE_FOR_TYPE.errno:
        return res.status(403).json({ error: ER_WRONG_VALUE_FOR_TYPE.message });
      case EXCEED_PEOPLE_LIMIT.errno:
        return res.status(403).json({ error: EXCEED_PEOPLE_LIMIT.message });
      default:
        return res.status(400).json({ error: err });
    }
  }

  res.status(200).json({
    data: {
      event_id: eventId,
    },
  });
}

import fetchProfile from "../../model/users/fetchProfile.model.js";
import {
  ECONNREFUSED,
  ER_WRONG_VALUE_FOR_TYPE,
} from "../../util/sqlErr.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function fetchProfileHandler(req, res, next) {
  const userId = req.user_id;
  const targetId = req.params.user_id;
  let result = null;
  try {
    [result] = await fetchProfile(userId, targetId);
  } catch (err) {
    switch (err.errno) {
      case ECONNREFUSED.errno:
        return res.status(500).json({ error: ECONNREFUSED.message });
      case ER_WRONG_VALUE_FOR_TYPE.errno:
        return res.status(403).json({ error: ER_WRONG_VALUE_FOR_TYPE.message });
      default:
        return res.status(400).json({ error: err });
    }
  }
	if (result.picture)
		result.picture = `http://${process.env.JOINEAT_HOST}${result.picture}`;
  return res.status(200).json({ data: { user: result } });
}

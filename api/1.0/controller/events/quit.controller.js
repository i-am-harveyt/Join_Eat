import eventQuit from "../../model/events/quit.model.js";
import verifyJWT from "../../util/jwt/verify.util.js";
import {
	ECONNREFUSED,
	ER_WRONG_VALUE_FOR_TYPE,
	HOST_CANNOT_QUIT,
} from "../../util/sqlErr.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function eventQuitHandler(req, res, next) {
	const result = verifyJWT(req.headers.authorization);
	const userId = result.user_id;

	const { event_id } = req.params;
	if (!event_id)
		return res.status(400).json({ error: "Missing required data." });

	try {
		const [result] = await eventQuit(event_id, userId);
		if (!result.affectedRows)
			return res.status(403).json({
				error: "You cannot quit this event, maybe you're not in.",
			});
	} catch (err) {
		switch (err.errno) {
			case ECONNREFUSED.errno:
				return res.status(500).json({ error: ECONNREFUSED.message });
			case ER_WRONG_VALUE_FOR_TYPE.errno:
				return res.status(403).json({ error: ER_WRONG_VALUE_FOR_TYPE.message });
			case HOST_CANNOT_QUIT.errno:
				return res.status(403).json({ error: HOST_CANNOT_QUIT.message });

			default:
				return res.status(400).json({ error: err });
		}
	}
	res.status(200).json({ data: { event: { event_id: event_id } } });
}

import eventQuit from "../../model/events/quit.model.js";
import verifyJWT from "../../util/jwt/verify.util.js";
import {
	ECONNREFUSED,
	ER_WRONG_VALUE_FOR_TYPE,
} from "../../util/sqlErr.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function eventQuitHandler(req, res, next) {
	let userId = 0;
	try {
		const result = verifyJWT(req.headers.authorization);
		userId = result.user_id;
	} catch (err) {
		return res.status(403).json({ error: "Wrong Token" });
	}

	const { event_id } = req.params;
	if (!event_id)
		return res.status(400).json({ error: "Missing required data." });

	try {
		const [result] = await eventQuit(event_id, userId);
		console.log(result);
		if (!result.affectedRows)
			return res
				.status(403)
				.json({
					error:
						"You cannot quit this event, either you're not in the group or you're the host. If you're the host, please delete the event instead of quit it",
				});
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
	res.status(200).json({ data: { event: { event_id: event_id } } });
}

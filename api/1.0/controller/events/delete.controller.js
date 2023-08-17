import eventDelete from "../../model/events/delete.model.js";
import {
	ECONNREFUSED,
	ER_WRONG_VALUE_FOR_TYPE,
} from "../../util/sqlErr.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function eventDeleteHandler(req, res, next) {
	const userId = req.user_id;
	const eventId = req.params.event_id;
	if (!(userId && eventId))
		return res.status(400).json({ error: "Missing Required Data" });

	let result = false;
	try {
		result = await eventDelete(eventId, userId);
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
	if (!result)
		return res
			.status(403)
			.json({ error: "You have no access to delete this event" });

	res.status(200).json({ data: { event: { event_id: eventId } } });
}

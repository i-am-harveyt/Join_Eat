import eventDetail from "../../model/events/detail.model.js";
import {
	ECONNREFUSED,
	ER_WRONG_VALUE_FOR_TYPE,
} from "../../util/sqlErr.util.js";
import transformTimeFormat from "../../util/transfromTimeFormat.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function eventDetailHandler(req, res, next) {
	const userId = req.user_id;
	const eventId = req.params.event_id;
	const { latitude, longitude } = req.query;

	if (!(userId && eventId && latitude && longitude))
		return res.status(400).json({ error: "Missing Required Data" });

	let data = null;
	try {
		const [row] = await eventDetail(eventId, userId, longitude, latitude);
		data = row;
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
	data.appointment_time = transformTimeFormat(data.appointment_time);
	data.participants.map(
		(e) =>
		(e.picture = e.picture
			? `http://${process.env.JOINEAT_HOST}${e.picture}`
			: null),
	);

	return res.status(200).json({ data });
}

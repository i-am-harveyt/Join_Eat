import transformTimeFormat from "../../util/transfromTimeFormat.util.js";
import fetchHistory from "../../model/users/fetchHistory.model.js";
import {
	ECONNREFUSED,
	ER_WRONG_VALUE_FOR_TYPE,
} from "../../util/sqlErr.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function fetchHistoryHandler(req, res, next) {
	const userId = req.user_id;
	const targetId = req.params.user_id;
	const {longitude, latitude} = req.query;

	let result = null;
	try {
		[result] = await fetchHistory(userId, targetId, longitude, latitude);
	} catch (err) {
		switch (err.errno) {
			case ECONNREFUSED.errno:
				return res.status(500).json({ error: ECONNREFUSED.message });
			case ER_WRONG_VALUE_FOR_TYPE:
				return res.status(403).json({ error: ER_WRONG_VALUE_FOR_TYPE.message });

			default:
				return res.status(400).json({ error: err });
		}
	}

	let hostCnt = 0,
		participantCnt = 0;

	const ret = result.map((row) => {
		if (row.host_id === targetId) hostCnt++;
		else participantCnt++;

		return {
			...row,
			appointment_time: transformTimeFormat(row.appointment_time),
		};
	});

	return res
		.status(200)
		.json({
			data: {
				host_count: hostCnt,
				participant_count: participantCnt,
				events: ret,
			},
		});
}

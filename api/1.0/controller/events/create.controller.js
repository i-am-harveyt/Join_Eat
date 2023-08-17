import crypto from "crypto";
import eventCreate from "../../model/events/create.model.js";
import verifyJWT from "../../util/jwt/verify.util.js";
import { ECONNREFUSED } from "../../util/sqlErr.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function eventCreateHandler(req, res, next) {
	let userId = 0;
	try {
		const result = verifyJWT(req.headers.authorization);
		userId = result.user_id;
	} catch (err) {
		return res.status(403).json({ error: "Wrong Token" });
	}

	const data = checkBody(req);
	if (!data) return res.status(400).json({ error: "Missing required data!" });

	const uuid = crypto.randomUUID();
	try {
		await eventCreate({
			event_id: uuid,
			host_id: userId,
			...data,
		});
	} catch (err) {
		switch (err.errno) {
			case ECONNREFUSED.errno:
				return res.status(500).json({ error: ECONNREFUSED.message });
			default:
				return res.status(400).json({ error: err });
		}
	}

	return res.status(200).json({
		data: {
			event_id: uuid,
		},
	});
}

/**
 * @param {import('express').Request} req
 */
function checkBody(req) {
	/* check request body */
	const {
		event_name,
		shop_name,
		latitude,
		longitude,
		is_public,
		appointment_time,
		people_limit,
	} = req.body;

	if (
		!(
			event_name &&
			shop_name &&
			latitude &&
			longitude &&
			typeof is_public === "boolean" &&
			appointment_time &&
			people_limit
		) ||
		!(
			appointment_time.year &&
			appointment_time.month &&
			appointment_time.date &&
			appointment_time.hour &&
			appointment_time.minute
		)
	)
		return false;

	const jsDate = new Date(
		appointment_time.year,
		appointment_time.month - 1,
		appointment_time.date,
		appointment_time.hour,
		appointment_time.minute,
	);

	return {
		event_name,
		shop_name,
		latitude,
		longitude,
		is_public,
		appointment_time: jsDate.toISOString().slice(0, 19).replace("T", " "),
		people_limit,
	};
}

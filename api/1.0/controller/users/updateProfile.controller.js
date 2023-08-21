import updateProfile from "../../model/users/updateProfile.model.js"
import express from "express";
import {
	ECONNREFUSED,
	ER_WRONG_VALUE_FOR_TYPE,
} from "../../util/sqlErr.util.js";
/**
 * @param { express.Request } req
 * @param { express.Response } res
 * @param { express.NextFunction } next
 */
async function updateProfileHandler(req, res, next) {
	const userId = req.user_id;

	const { introduction, tags } = req.body;

	try {
		updateProfile(userId, introduction, tags);
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

	res.status(200).json({ data: { user: { user_id: userId } } });
}
export default updateProfileHandler;

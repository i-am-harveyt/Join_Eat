import crypto from "crypto"
import signup from "../../model/users/signup.model.js";
import signJWT from "../../util/jwt/sign.util.js";
import { ECONNREFUSED, ER_DUP_ENTRY } from "../../util/sqlErr.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function signupHandler(req, res, next) {
	const { name, email, password } = req.body;
	if (!(name && email && password))
		return res.status(400).json({ error: "Missing Required Input!" });

	const uuid = crypto.randomUUID();
	try {
		await signup(uuid, name, email, password);
	} catch (err) {
		switch (err.errno) {
			case ECONNREFUSED.errno:
				return res.status(500).json({ error: ECONNREFUSED.message });
			case ER_DUP_ENTRY.errno:
				return res.status(403).json({ error: ER_DUP_ENTRY.message });
			default:
				return res.status(400).json({ error: err });
		}
	}

	res.status(200).json({
		data: {
			access_token: signJWT({ user_id: uuid }),
			user: {
				id: uuid,
				name: name,
				introduction: null,
				tags: null,
			},
		},
	});
}

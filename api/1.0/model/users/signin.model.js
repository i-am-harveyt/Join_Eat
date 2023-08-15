import db from "../db.js";

const query = `
SELECT id, name, password, self_introduction, tags
FROM users
WHERE email=?
`;

/**
 * @param {string} email
 */
export default async function signin(email) {
	const param = [email];
	try {
		return await db.execute(query, param);
	} catch (err) {
		throw err;
	}
}

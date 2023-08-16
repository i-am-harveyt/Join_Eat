import { genSaltSync, hashSync } from "bcrypt";
import db from "../db.js";

const query = `
INSERT INTO users (id, name, email, password)
VALUES (UUID_TO_BIN(?), ?, ?, ?);
`;
/**
 * @param {string} id: uuid for the user
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
export default async function signup(id, name, email, password) {
	const salt = genSaltSync(10);
	const hashedPwd = hashSync(password, salt);
	const params = [id, name, email, hashedPwd];

	try {
		return await db.execute(query, params);
	} catch (err) {
		throw err;
	}
}

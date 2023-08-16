import { genSaltSync, hashSync } from "bcrypt";
import db from "../db.js";

const query = `
INSERT INTO users (id, name, email, password)
VALUES (UUID_TO_BIN(UUID()), ?, ?, ?);
`;
/**
 * @param {string} email
 * @param {string} password
 */
export default async function signup(name, email, password) {
	const salt = genSaltSync(10);
	const hashedPwd = hashSync(password, salt);
	const params = [name, email, hashedPwd];

	try {
		return await db.execute(query, params);
	} catch (err) {
		throw err;
	}
}

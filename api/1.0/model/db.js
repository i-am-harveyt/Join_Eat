import { config } from "dotenv";
config();
import { createPool } from "mysql2/promise";

const db = createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

async () => {
	await db.query("SELECT 1", (err, rows, fields) => {
		console.log(rows);
	});
};

export default db;

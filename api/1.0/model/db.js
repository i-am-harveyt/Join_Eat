import { config } from "dotenv";
config();
import { createPool } from "mysql2";

const db = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  rowsAsArray: true,
});

db.query("SELECT 1 FROM test", (err, rows, fields) => {
  console.error(err);
  console.log(rows);
  console.log(fields);
});

export default db;

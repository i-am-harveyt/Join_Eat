import express from "express";
import { config } from "dotenv";
config();

const app = express();
const port = process.env.JOIN_EAT_PORT;

app.get("/", (req, res) => {
  res.send("Hello JoinEat!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});

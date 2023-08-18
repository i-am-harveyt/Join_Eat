import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import api from "./api/1.0/api.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.JOIN_EAT_PORT;

app.get("/", (req, res) => {
  res.send("Hello JoinEat!");
});

app.use("/api/1.0/", api);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});

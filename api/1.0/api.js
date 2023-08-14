import { Router } from "express";
import users from "./routes/users.js"

const api = Router();

api.use("/users", users);

export default api;

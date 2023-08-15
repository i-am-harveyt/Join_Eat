import { Router } from "express";
import users from "./routes/users.route.js"

const api = Router();

api.use("/users", users);

export default api;

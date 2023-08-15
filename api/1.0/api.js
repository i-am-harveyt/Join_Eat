import { Router } from "express";
import users from "./routes/users.route.js";
import events from "./routes/events.route.js";

const api = Router();

api.use("/users", users);
api.use("/events", events);

export default api;

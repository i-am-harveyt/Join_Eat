import { Router } from "express";
import asyncWrapper from "../util/asyncWrapper.util.js";
import eventCreateHandler from "../controller/events/create.controller.js";
import eventJoinHandler from "../controller/events/join.controller.js";
import eventQuitHandler from "../controller/events/quit.controller.js";

const events = Router();

events.get("/", (req, res) => {
	res.status(200).json({
		message: "Events API",
	});
});

events.post("/", asyncWrapper(eventCreateHandler));
events.post("/:event_id/join", asyncWrapper(eventJoinHandler));
events.post("/:event_id/quit", asyncWrapper(eventQuitHandler));

export default events;

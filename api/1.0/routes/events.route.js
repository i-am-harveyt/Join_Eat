import { Router } from "express";
import asyncWrapper from "../util/asyncWrapper.util.js";
import eventCreateHandler from "../controller/events/create.controller.js";

const events = Router();

events.get("/", (req, res) => {
	res.status(200).json({
		message: "Events API",
	});
});

events.post("/", asyncWrapper(eventCreateHandler));

export default events;

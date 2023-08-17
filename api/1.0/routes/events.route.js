import { Router } from "express";
import asyncWrapper from "../util/asyncWrapper.util.js";
import verifyTokenHandler from "../util/jwt/verifyToken.util.js";
import eventCreateHandler from "../controller/events/create.controller.js";
import eventJoinHandler from "../controller/events/join.controller.js";
import eventQuitHandler from "../controller/events/quit.controller.js";
import rangeQueryHandler from "../controller/events/range.controller.js";
import searchEventHandler from "../controller/events/search.controller.js";
import rangeShopHandler from "../controller/events/rangeShop.controller.js";

const events = Router();

events.use(verifyTokenHandler);

events.post("/", asyncWrapper(eventCreateHandler));
events.post("/:event_id/join", asyncWrapper(eventJoinHandler));
events.post("/:event_id/quit", asyncWrapper(eventQuitHandler));
events.get("/", asyncWrapper(rangeQueryHandler));
events.get("/search", asyncWrapper(searchEventHandler));
events.get("/shop", asyncWrapper(rangeShopHandler));

export default events;

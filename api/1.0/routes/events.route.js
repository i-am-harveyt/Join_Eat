import { Router } from "express";
import { isForm, isJSON } from "../middleware/requestType.mid.js";
import asyncWrapper from "../util/asyncWrapper.util.js";
import verifyTokenMiddleware from "../middleware/verifyToken.mid.js";
import eventCreateHandler from "../controller/events/create.controller.js";
import eventJoinHandler from "../controller/events/join.controller.js";
import eventQuitHandler from "../controller/events/quit.controller.js";
import rangeQueryHandler from "../controller/events/range.controller.js";
import searchEventHandler from "../controller/events/search.controller.js";
import rangeShopHandler from "../controller/events/rangeShop.controller.js";
import eventDetailHandler from "../controller/events/detail.controller.js";
import eventDeleteHandler from "../controller/events/delete.controller.js";

const events = Router();

events.use(verifyTokenMiddleware);

events.post("/", isJSON, asyncWrapper(eventCreateHandler));
events.get("/", asyncWrapper(rangeQueryHandler));
events.get("/search", asyncWrapper(searchEventHandler));
events.post("/shop", isJSON, asyncWrapper(rangeShopHandler));
events.post("/:event_id/join", isJSON, asyncWrapper(eventJoinHandler));
events.post("/:event_id/quit", isJSON, asyncWrapper(eventQuitHandler));
events.delete("/:event_id", asyncWrapper(eventDeleteHandler));
events.get("/:event_id", asyncWrapper(eventDetailHandler));

export default events;

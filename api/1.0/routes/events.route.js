import { Router } from "express";
import asyncWrapper from "../util/asyncWrapper.util.js";
import verifyTokenHandler from "../controller/users/verifyToken.controller.js";
import eventCreateHandler from "../controller/events/create.controller.js";
import rangeQueryHandler from "../controller/events/range.controller.js"
import searchEventHandler from "../controller/events/search.controller.js"
import rangeShopHandler from "../controller/events/rangeShop.controller.js" 

const events = Router();

events.use(verifyTokenHandler);

events.post("/", asyncWrapper(eventCreateHandler));
events.get("/", asyncWrapper(rangeQueryHandler));
events.get("/search", asyncWrapper(searchEventHandler));
events.get("/shop", asyncWrapper(rangeShopHandler));

export default events;

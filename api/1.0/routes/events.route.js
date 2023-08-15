import { Router } from "express";
import asyncWrapper from "../util/asyncWrapper.util.js";
//import signupHandler from "../controller/users/signup.controller.js";
//import signinHandler from "../controller/users/signin.controller.js";

const events = Router();

events.get("/", (req, res) => {
  res.status(200).json({
    message: "users api",
  });
});

events.post("/signup", asyncWrapper(signupHandler));
events.post("/signin", asyncWrapper(signinHandler));

export default users;

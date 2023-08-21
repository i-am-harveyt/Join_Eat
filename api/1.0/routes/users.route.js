import { Router } from "express";
import asyncWrapper from "../util/asyncWrapper.util.js";
import signupHandler from "../controller/users/signup.controller.js";
import signinHandler from "../controller/users/signin.controller.js";
import fetchProfileHandler from "../controller/users/fetchProfile.controller.js";
import verifyTokenMiddleware from "../middleware/verifyToken.mid.js";
import fetchHistoryHandler from "../controller/users/fetchHistory.controller.js";
import updateProfileHandler from "../controller/users/updateProfile.controller.js";
import { picUploader, uploadPictureHandler } from "../controller/users/uploadPicture.controller.js";
import { isForm, isJSON } from "../middleware/requestType.mid.js";

const users = Router();

users.get("/", (req, res) => {
	res.status(200).json({
		message: "users api",
	});
});

users.post("/signup", isJSON, asyncWrapper(signupHandler));
users.post("/signin", isJSON, asyncWrapper(signinHandler));
users.get(
	"/:user_id/events",
	verifyTokenMiddleware,
	asyncWrapper(fetchHistoryHandler),
);
users.get(
	"/:user_id",
	verifyTokenMiddleware,
	asyncWrapper(fetchProfileHandler),
);
users.put(
	"/profile",
	isJSON,
	verifyTokenMiddleware,
	asyncWrapper(updateProfileHandler),
);
users.put(
	"/picture",
	isForm,
	verifyTokenMiddleware,
	picUploader.single("picture"),
	asyncWrapper(uploadPictureHandler),
)

export default users;

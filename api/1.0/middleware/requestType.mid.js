import express from "express";

/**
 * @param { express.Request } req 
 * @param { express.Response } res 
 * @param { express.NextFunction } next 
 */
function isJSON(req, res, next) {
	if (!req.is("application/json"))
		return res.status(400).json({ error: "Wrong Format" });
	next();
}

/**
 * @param { express.Request } req 
 * @param { express.Response } res 
 * @param { express.NextFunction } next 
 */
function isForm(req, res, next) {
	if (!req.is("multipart/form-data"))
		return res.status(400).json({ error: "Wrong Format" });
	next();
}

export { isJSON, isForm };

import verifyJWT from "../util/jwt/verify.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

export default async function verifyTokenMiddleware(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    return res.status(401).json({ error: "No Token Input" });
  }
  try {
    const result = verifyJWT(bearerHeader);
    req.user_id = result.user_id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Wrong Token" });
  }
}

import { compareSync } from "bcrypt";
import signin from "../../model/users/signin.model.js";
import signJWT from "../../util/jwt/sign.util.js";
import { ECONNREFUSED } from "../../util/sqlErr.util.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default async function signinHandler(req, res, next) {
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(400).json({ error: "Missing Required Input" });

  let result = null;
  try {
    [[result]] = await signin(email, password);
  } catch (err) {
    switch (err.errno) {
      case ECONNREFUSED.errno:
        return res.status(500).json({ error: ECONNREFUSED.message });

      default:
        return res.status(400).json({ error: err });
    }
  }
  if (!result) return res.status(400).json({ error: "User Not found!" });

  if (!compareSync(password, result.password))
    return res.status(403).json({ error: "Wrong Password" });
  delete result.password;

  res.status(200).json({
    data: {
      access_token: signJWT({ user_id: result.id }),
      user: result,
    },
  });
}

import pkg from "jsonwebtoken";
const { sign } = pkg;

export default function signJWT(input = { default_key: "default_value" }) {
  return sign(input, process.env.JWT_SECRET, {
    // expiresIn: 60 * 60 * 24,
  });
}

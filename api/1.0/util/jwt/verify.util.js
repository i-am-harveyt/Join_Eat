import pkg from "jsonwebtoken";
const { verify } = pkg;

/**
 * @param {string} input
 */
export default function verifyJWT(input) {
  try {
    return verify(input.slice(7), process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }
}

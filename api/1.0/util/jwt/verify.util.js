import pkg from "jsonwebtoken";
const { verify } = pkg;

export default function verifyJWT(input) {
  try {
    return verify(input, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }
}

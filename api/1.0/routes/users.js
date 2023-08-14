import { Router } from "express";

const users = Router();

users.get("/", (req, res) => {
  res.status(200).json({
    message: "users api",
  });
});

export default users;

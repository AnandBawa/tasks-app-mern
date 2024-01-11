import { Router } from "express";
import rateLimiter from "express-rate-limit";
import { login, logout, register } from "../controllers/authController.js";

const authRouter = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 25,
  message: { message: "IP rate limit exceeded. Retry in 15 minutes" },
  validate: { xForwardedForHeader: false },
});

authRouter.route("/register").post(apiLimiter, register);

authRouter.route("/login").post(apiLimiter, login);

authRouter.route("/logout").post(logout);

export default authRouter;

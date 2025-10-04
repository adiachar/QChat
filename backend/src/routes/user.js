import express from "express";
const router = express.Router();
import { signIn, signUp } from "../control/user.js";
import {wrapAsync} from "../utils/wrapAsync.js";
import { isSignedIn } from "../middleware/authorizeUser.js";

router.post("/sign-in", wrapAsync(signIn));

router.post("/sign-up", wrapAsync(signUp));

router.get("/validate-token", isSignedIn, (req, res) => res.status(200).json({msg: "Token is Valid!", user: req.user}));

export default router;
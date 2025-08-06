import express from "express";
const router = express.Router();
import { addChat, deleteThreadById, getThreads, getThreadById } from "../control/chat.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { isSignedIn } from "../middleware/authorizeUser.js";

router.post("/chat", isSignedIn, wrapAsync(addChat));

router.get("/threads", isSignedIn, wrapAsync(getThreads));

router.get("/thread/:thread_id", isSignedIn, wrapAsync(getThreadById));

router.delete("/thread/:thread_id", isSignedIn, wrapAsync(deleteThreadById));

export default router;
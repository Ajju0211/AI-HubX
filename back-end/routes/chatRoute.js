import express,{Router} from "express";

import { chatResponse, getChat } from "../controller/authContoller.js";

const router = express.Router();

router.post("/chat-response", chatResponse);
router.post("/get-chat", getChat);

export default router;
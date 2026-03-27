import express from "express";
import multer from "multer"; 
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { editMessage, deleteMessage } from "../controllers/message.controller.js";

const router = express.Router();



// ✅ storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".webm"); // ✅ FIX: add extension
  },
});

const upload = multer({ storage });
// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
// router.get("/contacts",protectRoute, getAllContacts);
// By adding this line we get all data base users here and also remove one part from message.controller.js 
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
// router.post("/send/:id", sendMessage);

// ✅ MODIFY THIS LINE
router.post("/send/:id", upload.single("audio"), sendMessage);

router.put("/edit/:messageId", protectRoute, editMessage);

router.delete("/delete/:messageId", protectRoute, deleteMessage);

export default router;

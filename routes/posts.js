import express from "express";

const router = express.Router();

import { getPosts, createPost, updatePost, addComment } from "../controllers/posts.js";

// middleware
import auth from "../middleware/auth.js";

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/addComment", auth, addComment);

export default router;

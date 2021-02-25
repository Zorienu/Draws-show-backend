import express from "express";

const router = express.Router();

import { getPosts, createPost, updatePost, addComment } from "../controllers/posts.js";

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.patch("/:id/addComment", addComment);

export default router;

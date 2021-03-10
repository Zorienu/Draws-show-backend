import express from "express";

const router = express.Router();

import {
  getPosts,
  createPost,
  updatePost,
  addComment,
  likePost,
  deleteComment,
} from "../controllers/posts.js";

// middleware
import auth from "../middleware/auth.js";

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/addComment", auth, addComment);
router.patch("/:id/deleteComment", auth, deleteComment);
router.patch("/:id/likePost", auth, likePost);

export default router;

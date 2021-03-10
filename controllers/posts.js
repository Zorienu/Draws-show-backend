import mongoose from "mongoose";

import PostMessage from "../models/PostMessage.js";
import User from "../models/User.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const postUpdate = req.body;
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(409).json({ message: "No post with that id" });

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, postUpdate, { new: true });
  res.json(updatedPost);
};

export const addComment = async (req, res) => {
  const { comment } = req.body;
  const { id: postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(409).json({ message: "No post with that id" });

  const post = await PostMessage.findById(postId);
  post.comments.push({
    comment,
    author: `${req.user.firstName} ${req.user.lastName}`,
    authorId: req.user.id,
  });

  const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true });
  res.json(updatedPost);
};

export const deleteComment = async (req, res) => {
  const { id: postId } = req.params;
  const { commentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(409).json({ message: "No post with that id" });

  if (!mongoose.Types.ObjectId.isValid(commentId))
    return res.status(409).json({ message: "No comment with that id" });

  const post = await PostMessage.findById(postId);
  post.comments = post.comments.filter((comment) => String(comment._id) !== commentId);

  const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true });
  res.json(updatedPost);
};

export const likePost = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(409).json({ message: "No post with that id" });

  const post = await PostMessage.findById(postId);

  const isLiked = post.likes.find((like) => like === userId);

  if (isLiked) post.likes = post.likes.filter((like) => like !== userId);
  else post.likes.push(userId);

  const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, { new: true });
  res.json(updatedPost);
};

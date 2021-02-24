import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  author: String,
  authorId: String,
  description: String,
  selectedFile: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  likes: { type: [String], default: [] },
  comments: [{ type: String, default: [] }],
});

export default mongoose.model("PostMessage", postSchema);

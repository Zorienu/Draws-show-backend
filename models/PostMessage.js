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
  comments: [
    {
      comment: String,
      author: String,
      authorId: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("PostMessage", postSchema);

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();

import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

app.get("/", (req, res) => res.send("hello from draws-show API"));

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

console.log("Connecting to Database");
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log("listening on port 8000")));

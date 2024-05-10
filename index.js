const express = require("express");
const app = express();
const cors = require("cors");
const Config = require("./config/Config");
const UserRouter = require("./routes/UserRouter");
const PostRouter = require("./routes/PostRouter");
const CommentRouter = require("./routes/CommentRouter");
const FavoriteRouter = require("./routes/FavoriteRouter");
const AuthRouter = require("./routes/AuthRouter");

Config();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/favorite", FavoriteRouter);
app.use("/api/auth", AuthRouter);

app.listen(8080, () => {
  console.log("server listening on port 8080");
});

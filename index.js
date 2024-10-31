require("dotenv").config();

const express = require("express");
const cors = require("cors");

//importing connection
const { connection } = require("./configs/db");

//importing routes
const { userRouter } = require("./routes/User.route");
const { noteRouter } = require("./routes/Note.route");

// importing middlewares
const { authenticate } = require("./middlewares/authenticate.middleware");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Trouble connecting to DB");
    console.log(err);
  }
  console.log(`server is running on port ${port}`);
});

require("dotenv").config();
const path = require("path");
const express = require("express");
const Database = require("./database");
const { generateAccessToken } = require("./autorization");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

const app = express();
const port = process.env.PORT || 3000;

// JSON
app.use(bodyParser.json());

const DBOptions = {
  serviceAccountKeyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE_PATH,
  sheetId: process.env.GOOGLE_SHEET_ID,
};

const DB = new Database(DBOptions);

// React web app
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(express.static("public"));

app.post("/login", async (req, res) => {
  const users = await DB.getUsers();
  const user = users.find((user) => user.password === req.body.password);

  if (!user) {
    return res.status(401).json({
      error: "Нет такого чела",
    });
  }

  const token = generateAccessToken({ username: req.body.username });
  return res.status(200).json({
    token,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

require("dotenv").config();
const path = require("path");
const express = require("express");
const Database = require("./database");
const { generateAccessToken } = require("./autorization");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// CORS
app.use(cors());

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

function errorHandler(err, req, res, next) {
  console.log('err', err)
  if (res.headersSent) {
    return next(err)
  }
  return res.status(500).json({
    error: typeof err === 'string' ? err : (err?.message ?? 'Undefined error')
  });
}

app.post("/login", async (req, res, next) => {
  try {
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
      id: user.id,
    });
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

require("dotenv").config();
const path = require("path");
const express = require("express");
const { DB } = require("./dbInstance");
const { generateAccessToken, authenticateToken } = require("./autorization");
const bodyParser = require("body-parser");
const cors = require("cors");
const { events, checkValidations } = require("./validators");

const app = express();
const port = process.env.PORT || 3000;

// CORS
app.use(cors());

// JSON
app.use(bodyParser.json());

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

app.post('/events/create', authenticateToken, ...events.create, checkValidations, async (req, res, next) => {
  try {
    // Event object
    // title: string
    // start: timestamp
    // end: timestamp
    // allDay: boolean
    // owner: string
    const data = req.body;

    const event = await DB.createEvent(data);

    return res.status(200).json({
      event
    });
  } catch (err) {
    next(err);
  }
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

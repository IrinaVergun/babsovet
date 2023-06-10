require('dotenv').config()
const path = require("path");
const express = require('express');
const Database = require('./database');
const app = express()
const port = process.env.PORT || 3000;

const DBOptions = {
  serviceAccountKeyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE_PATH,
  sheetId: process.env.GOOGLE_SHEET_ID
};

const DB = new Database(DBOptions)

// React web app
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(express.static("public"));

app.get('/hello', async (req, res) => {
  await DB.getPasswords();
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
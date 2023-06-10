require('dotenv').config()
const path = require("path");
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

// React web app
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(express.static("public"));

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
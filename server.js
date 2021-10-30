const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 80;

app.use("/static", express.static(path.resolve(__dirname, "static")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

app.listen(port, () => console.log(`Server running... port : ${port}`));

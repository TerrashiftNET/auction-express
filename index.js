const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const fs = require("fs");

if (!fs.existsSync("data.json")) {
  fs.writeFileSync("data.json", "[]");
}

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.status(200).json(data);
});

app.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const newData = [...data, req.body];
  fs.writeFileSync("data.json", JSON.stringify(newData));
  res.status(200).json(newData);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

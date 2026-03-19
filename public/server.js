const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.json({ success: username === ADMIN_USER && password === ADMIN_PASS });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "Uploaded" });
});

app.get("/files", (req, res) => {
  const files = fs.readdirSync("uploads");
  res.json(files);
});

let students = [];

app.post("/students", (req, res) => {
  students.push(req.body);
  res.json({ message: "Student added" });
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(3000, () => console.log("Server running"));

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) console.error(err.message);
  else console.log("✅ Connected to SQLite database");
});

// tạo bảng user nếu chưa có
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// API đăng ký
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  db.run(
    `INSERT INTO users(username, password) VALUES(?, ?)`,
    [username, password],
    function (err) {
      if (err) return res.status(400).json({ error: "User đã tồn tại" });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// API đăng nhập
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (row) res.json({ success: true, message: "Đăng nhập thành công" });
      else
        res
          .status(401)
          .json({ success: false, message: "Sai tài khoản/mật khẩu" });
    }
  );
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

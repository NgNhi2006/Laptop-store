const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = new sqlite3.Database('../users.db', (err) => {
  if (err) console.error(err.message);
  else console.log('✅ Connected to SQLite database');
});

// tạo bảng user nếu chưa có
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )
`);

// API đăng ký
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log('Registering user:', username);
  db.run(`INSERT INTO users(username, password) VALUES(?, ?)`,
    [username, password],
    function(err) {
      if (err) {
        console.error('Registration error:', err.message);
        return res.status(400).json({ error: 'User đã tồn tại' });
      }
      console.log('Registration successful for user:', username);
      res.json({ success: true, id: this.lastID });
    });
});

// API đăng nhập
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for user:', username);
  db.get(`SELECT id, username, role FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) {
        console.error('Login error:', err.message);
        return res.status(500).json({ error: 'Lỗi server' });
      }
      if (row) {
        console.log('Login successful for user:', username);
        res.json({ success: true, message: 'Đăng nhập thành công', user: row });
      } else {
        console.log('Login failed for user:', username);
        res.status(401).json({ success: false, message: 'Sai tài khoản/mật khẩu' });
      }
    });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

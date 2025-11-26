require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
console.log("Connecting to:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'hoteldb'
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log("MongoDB Error:", err))

// Fake Database (Memory me store hoga – restart pe gayab hoga, perfect for testing)
let users = [];
let bookings = [];

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), email, password: hashed };
  users.push(user);
  const token = jwt.sign({ id: user.id }, "secret-key-123");
  res.json({ token, message: "Registered successfully!" });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: "Wrong email or password" });
  }
  const token = jwt.sign({ id: user.id }, "secret-key-123");
  res.json({ token, message: "Login successful!" });
});

// Create Booking (JWT protected)
app.post('/bookings', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Login first" });

  try {
    const decoded = jwt.verify(token, "secret-key-123");
    const booking = {
      id: Date.now().toString(),
      userId: decoded.id,
      hotel: req.body.hotel,
      amount: req.body.amount,
      date: new Date().toLocaleDateString(),
      status: "Confirmed"
    };
    bookings.push(booking);
    res.json({ success: true, booking });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Get My Bookings
app.get('/bookings', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Login first" });

  try {
    const decoded = jwt.verify(token, "secret-key-123");
    const myBookings = bookings.filter(b => b.userId === decoded.id);
    res.json(myBookings);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend chal raha hai: http://localhost:${PORT}`);
  console.log("Register: POST /register {email, password}");
  console.log("Login: POST /login {email, password}");
  console.log("Bookings: GET/POST /bookings (Bearer token in header)");
});
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory DB
let users = [];
let bookings = [];

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), email, password: hashed };
  users.push(user);
  const token = jwt.sign({ userId: user.id }, 'mysecretkey', { expiresIn: '7d' });
  res.json({ token });
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, 'mysecretkey', { expiresIn: '7d' });
  res.json({ token });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, 'mysecretkey');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Create Booking
app.post('/bookings', verifyToken, (req, res) => {
  const booking = {
    _id: Date.now().toString(),
    userId: req.userId,
    hotel: req.body.hotel,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    guests: req.body.guests,
    amount: req.body.amount,
  };
  bookings.push(booking);
  res.json({ success: true, booking });
});

// Get My Bookings
app.get('/bookings', verifyToken, (req, res) => {
  const myBookings = bookings.filter(b => b.userId === req.userId);
  res.json(myBookings);
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Backend running on http://192.168.1.17:5000');
});
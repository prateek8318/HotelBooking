# 🏨 HotelBooking

A hotel booking application with a **Node.js + Express** REST API backend that handles user authentication and room bookings.

## ✨ Features

- 🔐 User registration & login with **JWT** authentication
- 🔑 Password hashing with **bcryptjs**
- 📅 Create and list bookings via REST endpoints
- 🌐 CORS-enabled API for a separate frontend client

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

## 📁 Project Structure

```
HotelBooking/
├── Hotel/            # Frontend
└── hotel-backend/    # Express API
    ├── server.js
    └── package.json
```

## 🔌 API Endpoints

| Method | Endpoint     | Description            |
|--------|--------------|------------------------|
| POST   | `/register`  | Register a new user    |
| POST   | `/login`     | Log in and receive JWT |
| POST   | `/bookings`  | Create a booking       |
| GET    | `/bookings`  | List bookings          |

## 🚀 Getting Started

```bash
git clone https://github.com/prateek8318/HotelBooking.git
cd HotelBooking/hotel-backend
npm install
npm start
```

The API runs on **http://localhost:5000**.

## 👤 Author

**Prateek Kumar Pandey** — [GitHub](https://github.com/prateek8318) · [LinkedIn](https://www.linkedin.com/in/prateek-pandey-6087b624b/)

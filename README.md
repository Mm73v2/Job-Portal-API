
# 💼 Job Portal API

**Job Portal API** is a scalable and secure back-end service for a modern job portal platform. Built with **Express.js**, **TypeScript**, **MySQL**, and **Redis**, this RESTful API provides robust features for job providers and seekers, including real-time messaging, role-based access, and secure user authentication.

Designed with performance, maintainability, and user experience in mind, this system empowers job matching with reliability and speed.

---

## 🚀 Key Features

- 🔐 **Authentication & Email Verification** – Secure login, registration with JWT tokens, and OTP-based email verification using **NodeMailer**.
- 💼 **Role-Based Access Control (RBAC)** – Separate permissions and functionalities for job providers and job seekers.
- 📢 **Job Management** – Providers can create, update, and manage job listings while seekers can apply and track their applications.
- 💬 **Real-Time Chat** – In-app messaging built with **Socket.IO** for real-time communication between users.
- 🧠 **Redis Caching** – Boosts performance and reduces DB load with intelligent caching.
- 🧱 **Rate Limiting** – Protects the system from abuse and DDoS attacks.
- 💾 **Sequelize ORM** – Efficient interaction with **MySQL** through an organized and structured ORM approach.
- 🛡️ **TypeScript** – Ensures type safety, clean architecture, and maintainable codebase.

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MySQL** + **Sequelize**
- **JWT**
- **Socket.IO**
- **Redis**
- **NodeMailer**
- **Postman**

---

## ⚙️ Getting Started

### 📌 Prerequisites

Ensure you have the following installed:

- Node.js v18+
- MySQL Server
- Redis
- A Mailtrap or SMTP-compatible account
- Postman (optional, for API testing)

---

### 💻 Installation

```bash
git clone https://github.com/mohamed-abobakr73/Job-Portal-API.git
cd Job-Portal-API
npm install
```

---

### ⚙️ Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=job_portal

JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mail_user
SMTP_PASS=your_mail_password
```

---

### ▶️ Running the Server

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

---

## 📮 API Highlights

- User authentication & OTP verification
- Job posting & application endpoints
- Real-time chat with Socket.IO
- RBAC middleware protection
- Cached endpoints using Redis

---

## 🤝 Contributing

Pull requests, issues, and feature suggestions are always welcome! Help improve the API by contributing to the codebase.

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

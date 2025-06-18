##📮 DevifyX – Post Scheduling System

A robust Node.js backend API that allows authenticated users to schedule posts for future publishing. Posts are automatically published at the defined time using a job scheduler. Built with Express.js, MongoDB, JWT, and cron jobs.

---

## 🚀 Features
- 🔐 JWT-based user authentication

- 📝 Create scheduled posts with content and publish time

- 📅 Auto-publishing using job scheduler (node-cron)

- 📬 Optional email notifications on post publish

- 📊 Check post status (scheduled, published, failed)

- 🧩 Update / Delete scheduled (not-yet-published) posts

- 📄 Swagger-based API documentation

- 🛡️ Rate limiting for abuse protection

---

## 🏗️ Project Structure

```pgsql
devifyx-post-scheduler/
│
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── postController.js
├── jobs/
│   └── postPublisher.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── rateLimiter.js
├── models/
│   ├── User.js
│   └── Post.js
├── routes/
│   ├── authRoutes.js
│   └── postRoutes.js
├── utils/
│   └── sendEmail.js
├── swagger.json
├── .env
├── app.js
├── server.js
└── package.json
```

---
## ⚙️ Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Node-Cron for scheduled publishing
- Nodemailer for emails
- Express Validator for validation
- Rate Limiter, Swagger, dotenv

---

## 📦 Installation
```bash
git clone https://github.com/your-username/devifyx-post-scheduler.git
cd devifyx-post-scheduler
npm install
```

---

## ▶️ Running the Server
```bash
# For development with live reload
npm run dev

# Or production
npm start
```

---

## 🧪 API Endpoints

| Method   | Route                   | Description               |
| -------- | ----------------------- | ------------------------- |
| `POST`   | `/api/auth/register`    | Register user             |
| `POST`   | `/api/auth/login`       | Login user                |
| `POST`   | `/api/posts`            | Create scheduled post     |
| `GET`    | `/api/posts/published`  | Fetch all published posts |
| `GET`    | `/api/posts/:id/status` | Check post status         |
| `PUT`    | `/api/posts/:id`        | Update scheduled post     |
| `DELETE` | `/api/posts/:id`        | Delete scheduled post     |

---
# 🛠️ Use of AI Tools

This project was built with the assistance of ChatGPT and GitHub Copilot for code suggestions, error handling strategies, architectural decisions, and API documentation generation. All code was reviewed, customized, and tested manually to ensure quality and security.

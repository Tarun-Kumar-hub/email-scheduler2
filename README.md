# Home2Dorm – Student Task & Email Reminder System

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Framework-black?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)
![Passport.js](https://img.shields.io/badge/Passport.js-Authentication-34E27A)
![EJS](https://img.shields.io/badge/EJS-Template-B4CA65)

A web application that helps students organize tasks before moving from home to a dorm while automatically sending **weekly email reminders**. Home2Dorm combines secure authentication, task management, and scheduled email notifications to improve productivity.

Built with **Node.js**, **Express.js**, **PostgreSQL**, **Passport.js**, **Nodemailer**, **EJS**, and **Node Schedule**.

---

## 📑 Table of Contents

- [Application Preview](#-application-preview)
- [About the Project](#-about-the-project)
- [Highlights](#-highlights)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Authentication](#-authentication)
- [Email Reminder System](#-email-reminder-system)
- [Environment Variables](#️-environment-variables)
- [Installation](#-installation)
- [Available Scripts](#-available-scripts)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---
# 📸 Application Preview

Explore the key features of **Home2Dorm – Student Task & Email Reminder System**.

| 🔐 Google Authentication | 📋 Task Management |
|:------------------------:|:------------------:|
| ![Google Authentication](https://github.com/user-attachments/assets/8e730996-6931-496a-ad21-08e5215f7380) | ![Task Management](https://github.com/user-attachments/assets/89ad795d-1106-4bc3-8619-66e05866f318) |

| 📧 Weekly Email Reminder |
|:------------------------:|
| ![Weekly Email Reminder](https://github.com/user-attachments/assets/12a1df5a-7441-4f32-a2f0-a2790c0078cd) |

---

# 📖 About the Project

Home2Dorm is a productivity application designed for students who are preparing to move into dormitories.

The application allows users to maintain a personalized checklist of items and tasks while automatically sending scheduled email reminders, ensuring important items are never forgotten.

---

# ✨ Highlights

- Google OAuth Authentication
- Weekly Automated Email Reminders
- PostgreSQL Relational Database
- Scheduled Background Jobs
- Dynamic Email Templates using EJS
- CRUD Task Management
- Secure Session-based Authentication
- Modular Express.js Architecture

---

# 🚀 Features

| Module | Features |
|---------|----------|
| 🔐 Authentication | Google OAuth Login using Passport.js |
| 📋 Tasks | Create, Update, Delete & Manage Tasks |
| 📂 Categories | Organize tasks by category |
| ⭐ Priority | High, Medium & Low Priority |
| 📧 Email | Manual & Scheduled Weekly Email Reminders |
| 🗄 Database | PostgreSQL Data Storage |
| ⏰ Scheduler | Automatic Weekly Email Notifications |

---

# 🛠 Tech Stack

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

### Authentication

- Passport.js
- Google OAuth 2.0
- Express Session

### Email Services

- Nodemailer
- Node Schedule

### Frontend

- EJS
- HTML
- CSS

### Database Driver

- pg

---

# 🏗 Architecture

```text
                 User
                   │
                   ▼
            Express.js Server
                   │
      Passport Google Authentication
                   │
            Task Management
                   │
           PostgreSQL Database
                   │
       Weekly Scheduled Job
                   │
             Nodemailer
                   │
             Email Reminder
```

---

# 📂 Project Structure

```text
home2dorm
├── config
├── middleware
├── routes
├── services
├── public
├── views
├── utils
├── index.js
└── package.json
```

---

# 🔐 Authentication

The application implements secure authentication using:

- Google OAuth 2.0
- Passport.js
- Express Sessions
- User Session Management

---

# 📧 Email Reminder System

A scheduled background job automatically:

- Retrieves user tasks from PostgreSQL
- Generates an HTML email using EJS templates
- Sends weekly reminder emails via Nodemailer
- Helps users stay organized before moving to their dorm

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
PORT=3000

DATABASE_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SESSION_SECRET=

EMAIL_USER=
EMAIL_PASS=
```

---

# 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Tarun-Kumar-hub/home2dorm-email-reminder.git

# Navigate to the project
cd home2dorm-email-reminder

# Install dependencies
npm install

# Start the application
npm start
```

---

# 📜 Available Scripts

```bash
npm start
```

---

# 📌 Future Enhancements

- 📱 Responsive UI
- 📅 Calendar Integration
- 🔔 Push Notifications
- 🌙 Dark Mode
- 📊 Analytics Dashboard
- 📱 Progressive Web App (PWA)

---

## 👨‍💻 Author

**Tarun Kumar**

- **GitHub:** https://github.com/Tarun-Kumar-hub
- **LinkedIn:** https://www.linkedin.com/in/tarun-kumar-042288144/

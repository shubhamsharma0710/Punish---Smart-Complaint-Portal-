# Smart Complaint Portal

## Overview

Smart Complaint Portal is a full-stack web application designed to register, track, and resolve complaints related to a company or service. The platform supports two roles: Consumer and Reviewer, enabling structured communication and resolution of issues.

---

## Features

### Authentication

* User signup and login
* Secure password hashing using bcrypt
* JWT-based authentication

### Role-Based Access

* Consumer

  * Create complaints
  * Delete own complaints
  * Add comments
* Reviewer

  * View all complaints
  * Assign complaints
  * Mark complaints as resolved
  * Add comments

### Complaint Management

* Create, view, and delete complaints
* Status tracking (Pending / Resolved)
* Reviewer assignment

### Comment System

* Two-way communication between consumer and reviewer
* Comments linked to complaints

---

## Tech Stack

### Frontend

* React (TypeScript)
* Tailwind CSS
* Axios

### Backend

* NestJS
* Prisma ORM
* PostgreSQL

---

## Project Structure

```
smart-complaint-portal/
│
├── smart-complaint-backend/
│   ├── src/
│   ├── prisma/
│   └── package.json
│
├── smart-complaint-frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### Backend Setup

1. Navigate to backend folder

```
cd smart-complaint-backend
```

2. Install dependencies

```
npm install
```

3. Setup environment variables (.env)

```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

4. Run migrations

```
npx prisma migrate dev
```

5. Start server

```
npm run start:dev
```

---

### Frontend Setup

1. Navigate to frontend folder

```
cd smart-complaint-frontend
```

2. Install dependencies

```
npm install
```

3. Start frontend

```
npm run dev
```

---

## API Endpoints

### Auth

* POST /auth/signup
* POST /auth/login

### Complaints

* POST /complaints
* GET /complaints
* PATCH /complaints/:id/assign
* PATCH /complaints/:id/resolve
* DELETE /complaints/:id/:userId

### Comments

* POST /comments
* GET /comments/:complaintId

---

## Working Flow

1. Consumer signs up and logs in
2. Consumer creates a complaint
3. Reviewer logs in and views all complaints
4. Reviewer assigns or resolves complaints
5. Both parties communicate through comments

---

## Key Highlights

* Role-based access control
* Secure authentication system
* Relational database with Prisma
* Clean and responsive UI using Tailwind
* RESTful API architecture

---

## Future Improvements

* JWT-based route protection
* Filter complaints by status
* Pagination and search
* Notifications system
* Deployment (Docker / Cloud)

---

## Author

Shubham Sharma
B.Tech Computer Science
Frontend & Backend Developer

---

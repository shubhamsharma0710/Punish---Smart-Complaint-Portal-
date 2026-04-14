# Smart Complaint Portal

Overview

Smart Complaint Portal is a full-stack web application designed to register, manage, and resolve complaints related to a company or service. The system supports two roles: Consumer and Reviewer, enabling structured complaint handling and communication.

Features
Authentication
User signup and login
Secure password hashing using bcrypt
JWT-based authentication
Role-Based Access Control
Consumer
Create complaints
Delete own complaints
Add comments
Reviewer
View all complaints
Assign complaints
Mark complaints as resolved
Add comments
Complaint Management
Create, view, and delete complaints
Track complaint status (Pending / Resolved)
Reviewer assignment functionality
Comment System
Two-way communication between consumer and reviewer
Comments linked to complaints
Tech Stack
Frontend
React (TypeScript)
Tailwind CSS
Axios
Backend
NestJS
Prisma ORM
PostgreSQL
DevOps
Docker
Docker Compose
Project Structure
smart-complaint-portal/
│
├── smart-complaint-backend/
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
│
├── smart-complaint-frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
Setup Instructions
Option 1: Run Without Docker
Backend
cd smart-complaint-backend
npm install
npx prisma migrate dev
npm run start:dev
Frontend
cd smart-complaint-frontend
npm install
npm run dev
Option 2: Run With Docker (Recommended)
Prerequisites
Docker Desktop installed and running
Steps
docker-compose up --build
Access Application
Frontend: http://localhost:5173
Backend: http://localhost:3000
API Endpoints
Auth
POST /auth/signup
POST /auth/login
Complaints
POST /complaints
GET /complaints
PATCH /complaints//assign
PATCH /complaints//resolve
DELETE /complaints//
Comments
POST /comments
GET /comments/
Working Flow
Consumer signs up and logs in
Consumer creates a complaint
Reviewer logs in and views all complaints
Reviewer assigns or resolves complaints
Both parties communicate via comments
Key Highlights
Full-stack application using modern technologies
Role-based access control system
Secure authentication with JWT
Relational database using Prisma ORM
Containerized using Docker and Docker Compose
Clean and responsive UI
Future Enhancements
JWT-based route protection
Filtering complaints by status
Pagination and search
Notifications system
Production deployment (cloud / CI-CD)

## Author

Shubham Sharma
B.Tech Computer Science
Frontend & Backend Developer

---

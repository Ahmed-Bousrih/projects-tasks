# Projects & Tasks App

A full-stack application for managing projects and tasks, built with **NestJS** (backend), **Next.js + TypeScript** (frontend), and **PostgreSQL** (database). The app supports user authentication with JWT.

## Features

- User registration and login
- Dashboard showing user projects
- Project details with tasks
- Add new projects and tasks
- Fully containerized with Docker

## Technologies

- **Backend:** NestJS, TypeORM, JWT, Bcrypt  
- **Frontend:** Next.js, React, TailwindCSS, Axios  
- **Database:** PostgreSQL  
- **Containerization:** Docker, Docker Compose  

## Getting Started

### Requirements

- Docker & Docker Compose installed

### Run with Docker

1. Clone the repository:

```bash
git clone https://github.com/Ahmed-Bousrih/projects-tasks.git
cd projects-tasks
Start all services:

bash
Copy
Edit
docker-compose up --build
Services:

Service	Port
Backend (NestJS API)	3001
Frontend (Next.js)	3000
Database (PostgreSQL)	5432

Environment Variables
Create .env files for backend and frontend as needed.

Backend (apps/api/.env):

ini
Copy
Edit
PORT=3001
DATABASE_URL=postgres://postgres:postgres@db:5432/projects_tasks
JWT_SECRET=yourSecretKey
Frontend (apps/web/.env):

ini
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:3001
In Docker, the frontend can also use http://api:3001 if referencing the API container directly.

Access
Frontend: http://localhost:3000

API: http://localhost:3001

Database
PostgreSQL username/password: postgres/postgres

Database: projects_tasks

Tables will be automatically created by TypeORM on first run.

Development
To run frontend or backend separately (without Docker):

Backend:

bash
Copy
Edit
cd apps/api
npm install
npm run start:dev
Frontend:

bash
Copy
Edit
cd apps/web
npm install
npm run dev
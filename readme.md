# Projects & Tasks App

A full-stack application to manage projects and tasks, built with <strong>NestJS</strong> (backend), <strong>Next.js + TypeScript</strong> (frontend), and <strong>PostgreSQL</strong> (database). The app supports <strong>user authentication</strong> with JWT and is fully <strong>containerized with Docker</strong>.

---

## Features

<ul>
  <li>User registration and login</li>
  <li>Dashboard showing user projects</li>
  <li>Project details with tasks</li>
  <li>Add new projects and tasks</li>
  <li>Fully containerized for easy deployment</li>
</ul>

---

## Technologies

<ul>
  <li><strong>Backend:</strong> NestJS, TypeORM, JWT, Bcrypt</li>
  <li><strong>Frontend:</strong> Next.js, React, TailwindCSS, Axios</li>
  <li><strong>Database:</strong> PostgreSQL</li>
  <li><strong>Containerization:</strong> Docker, Docker Compose</li>
</ul>

---

## Getting Started

### Requirements

<ul>
  <li>Docker & Docker Compose installed</li>
</ul>

### Run with Docker

<pre><code>git clone https://github.com/Ahmed-Bousrih/projects-tasks.git
cd projects-tasks
docker-compose up --build
</code></pre>

### Services and Ports

<table>
  <tr>
    <th>Service</th>
    <th>Port</th>
  </tr>
  <tr>
    <td>Backend (NestJS API)</td>
    <td>3001</td>
  </tr>
  <tr>
    <td>Frontend (Next.js)</td>
    <td>3000</td>
  </tr>
  <tr>
    <td>Database (PostgreSQL)</td>
    <td>5432</td>
  </tr>
</table>

---

### Environment Variables

**Backend (`apps/api/.env`):**

<pre><code>PORT=3001
DATABASE_URL=postgres://postgres:postgres@db:5432/projects_tasks
JWT_SECRET=yourSecretKey
</code></pre>

**Frontend (`apps/web/.env`):**

<pre><code>NEXT_PUBLIC_API_URL=http://localhost:3001
</code></pre>

<p><strong>Note:</strong> In Docker, the frontend can also use <code>http://api:3001</code> if referencing the API container directly.</p>

---

### Access the App

<ul>
  <li><strong>Frontend:</strong> <a href="http://localhost:3000">http://localhost:3000</a></li>
  <li><strong>API:</strong> <a href="http://localhost:3001">http://localhost:3001</a></li>
</ul>

<p><strong>Database Info:</strong></p>
<ul>
  <li>PostgreSQL username/password: <code>postgres/postgres</code></li>
  <li>Database: <code>projects_tasks</code></li>
  <li>Tables will be automatically created by TypeORM on first run</li>
</ul>

---

### Development (Without Docker)

**Backend:**

<pre><code>cd apps/api
npm install
npm run start:dev
</code></pre>

**Frontend:**

<pre><code>cd apps/web
npm install
npm run dev
</code></pre>

---

## License

MIT

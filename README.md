# Jobify API

REST API for **[Jobify](https://github.com/Abdel-Fadeel/Jobify)**, a job-application tracker. Built with **Node.js, Express and TypeScript**, using **MongoDB (Mongoose)**, JWT auth in HTTP-only cookies, and Cloudinary for avatar uploads.

**Front end:** [Abdel-Fadeel/Jobify](https://github.com/Abdel-Fadeel/Jobify) · **Live app:** _coming soon_

## Features

- **Authentication.** Register, login and logout, with JWT stored in an HTTP-only, secure cookie.
- **Role-based access.** Admin-only app stats, plus a read-only **demo user** (`testuser@test.com`) that can browse but can't change data.
- **Jobs CRUD.** Create, read, update and delete jobs, scoped to the logged-in user.
- **Search, filter, sort and paginate** jobs by position, status and type.
- **Stats.** Aggregation pipelines for status totals and monthly applications (last 6 months).
- **Profile updates** with avatar upload (Multer to Cloudinary).
- **Validation** with `express-validator`, and a central error handler with custom error classes.
- **Security.** Helmet, `express-mongo-sanitize`, rate limiting and CORS restricted to the client origin.

## API endpoints

Base URL: `/api/v1`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | – |
| POST | `/auth/login` | Log in, sets the auth cookie | – |
| GET | `/auth/logout` | Log out, clears the cookie | – |
| GET | `/jobs` | List jobs (`search`, `jobStatus`, `jobType`, `sort`, `page`) | User |
| POST | `/jobs` | Create a job | User (not demo) |
| GET | `/jobs/stats` | Status totals and monthly applications | User |
| GET | `/jobs/:id` | Get one job | User |
| PATCH | `/jobs/:id` | Update a job | User (not demo) |
| DELETE | `/jobs/:id` | Delete a job | User (not demo) |
| GET | `/users/current-user` | Current user profile | User |
| GET | `/users/admin/app-stats` | Total users and jobs | Admin |
| PATCH | `/users/update-user` | Update profile and avatar (multipart) | User (not demo) |

## Tech stack

| | |
|---|---|
| Runtime | Node.js 20, Express 4 |
| Language | TypeScript (ES modules) |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT, bcryptjs, HTTP-only cookies |
| Uploads | Multer, DataURI, Cloudinary |
| Security | Helmet, express-mongo-sanitize, express-rate-limit, CORS |
| Validation | express-validator |

## Getting started

```bash
git clone https://github.com/Abdel-Fadeel/Jobify-API.git
cd Jobify-API
npm install
cp .env.example .env   # then fill in your values
npm run dev
```

The server runs on `http://localhost:5100`. Run the [front end](https://github.com/Abdel-Fadeel/Jobify) next to it, and Vite proxies `/api` to this server.

To seed the demo user with sample jobs:

```bash
npx tsc && node dist/utils/populateDB.js
```

### Environment variables

See [`.env.example`](.env.example). `CLIENT_URL` is a comma-separated list of front-end origins allowed by CORS.

## Project structure

```
app.ts            # Express app, middleware, routes, DB connection
controllers/      # auth, job, user
routes/           # auth, job, user routers
models/           # User, Job (Mongoose)
middlewares/      # auth (JWT, roles, demo user), validation, error handler, multer
errors/           # Custom error classes
utils/            # constants, token, password helpers, seed script + mock data
```

## Author

**Abdel-Fadeel Hamdy**, Front-End Engineer · [GitHub](https://github.com/Abdel-Fadeel)

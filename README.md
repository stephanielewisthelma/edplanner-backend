# edplanner-backend
Backend for EdPlanner (Node.js + TypeScript)


# EdPlanner Backend

Stack: Express + TypeScript + Prisma + PostgreSQL + JWT

## Requirements
- Node 18+
- PostgreSQL running locally or a managed DB

## Setup (local)
1. Install deps:
   npm install

2. Copy .env.example -> .env and update DATABASE_URL and JWT_SECRET:
   cp .env.example .env

3. Generate Prisma client and run migrations:
   npx prisma generate
   npx prisma migrate dev --name init

   Note: Prisma may warn about enum changes if you modified the schema previously. If you see warnings, confirm only if you understand the change.

4. Start dev server:
   npm run dev

The API will run on http://localhost:5000 by default.

## Useful endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- GET /api/users/me
- POST /api/subjects
- GET /api/subjects
- POST /api/tasks
- GET /api/tasks
- POST /api/reminders
...

## Notes
- The reminder cron logs reminders; replace console.log with email/push logic for production.
- For secure refresh token handling, consider using httpOnly cookies.
- Set CORS_ORIGINS in .env to restrict allowed origins.


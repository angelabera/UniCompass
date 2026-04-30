# UniCompass - College Discovery Platform

UniCompass is a modern, production-grade full-stack web application designed to help students discover, compare, and shortlist top colleges. 

## Features
- **College Discovery**: Browse colleges with search, pagination, and location/fee filters.
- **Compare Tool**: Select up to 3 colleges to compare their placements, fees, ratings, and location side-by-side.
- **College Details**: View comprehensive data including overviews, courses, and placement statistics.
- **User Authentication**: Secure JWT-based login and registration.
- **Saved List**: Registered users can save colleges to their personalized list.
- **Premium UI**: Modern glassmorphism design with animated gradient backgrounds and responsive layout.

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion, Zustand, Axios
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM
- **Database**: PostgreSQL

---

## Local Development Setup

### 1. Database Configuration
1. For local development, the app uses an out-of-the-box SQLite database (`dev.db`). No setup is required.
2. If you'd like to switch to PostgreSQL, update `provider = "postgresql"` in `prisma/schema.prisma` and add your `DATABASE_URL` in `backend/.env`.

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma db push
npm run prisma:seed
npm run dev
```
The backend server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:3000`.

---

## Deployment Instructions

### Database (Supabase / Neon)
1. Create a free PostgreSQL database on [Neon](https://neon.tech) or [Supabase](https://supabase.com).
2. Copy the provided connection string.

### Backend (Render / Railway)
1. Push your repository to GitHub.
2. Create a new Web Service on [Render](https://render.com) or [Railway](https://railway.app).
3. Set the Root Directory to `backend`.
4. Build Command: `npm install && npx prisma generate && npx tsc`
5. Start Command: `node dist/index.js`
6. Environment Variables:
   - `DATABASE_URL`: Your production database URL from Neon/Supabase.
   - `JWT_SECRET`: A secure random string for authentication.
   - `PORT`: 5000 (Render typically overrides this, which is fine).
7. Deploy the backend and copy the live URL.

### Database Migration in Production
Once your database is configured in your backend service, you can run migrations by adding a script to your `package.json` or by temporarily running `npx prisma db push` and `npx prisma db seed` connected to the production URL.

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and import your GitHub repository.
2. Set the Root Directory to `frontend`.
3. Framework Preset: Next.js.
4. Environment Variables:
   - `NEXT_PUBLIC_API_URL`: The live URL of your deployed backend service.
5. Deploy the application.

Enjoy using UniCompass!

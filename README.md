# UniCompass

UniCompass is a full-stack college discovery platform built to help students explore institutions, compare options, save favorites, and ask practical questions before making education decisions.

The app combines a modern Next.js frontend with an Express and Prisma backend, using a clean responsive UI, authentication, dark mode, and a student-focused Q&A experience.

## Features

- **College Discovery**: Browse colleges with search, pagination, location filters, fee filters, and college type filters.
- **College Details**: View individual college pages with overview, courses, ratings, and placement statistics.
- **Compare Colleges**: Compare multiple institutions side by side using important decision factors.
- **Student Q&A**: Ask questions, answer questions, and view discussions from other students.
- **Authentication**: Register and log in with JWT-based authentication.
- **Saved Colleges**: Save colleges to a personal shortlist after logging in.
- **Dark Mode**: Toggle between light and dark themes with persistent preference.
- **Responsive UI**: Modern gradient-based interface with glass panels, polished cards, and mobile-friendly layouts.
- **About Page and Footer**: Informational About page and a styled footer matching the visual identity of the site.

## Tech Stack

### Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Axios
- Lucide React Icons

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT authentication
- bcrypt password hashing

### Database

- SQLite for local development through Prisma

## Project Structure

```text
UniCo/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   └── src/
│       ├── middleware/
│       ├── routes/
│       ├── db.ts
│       └── index.ts
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── store/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

## Environment Variables

### Backend

Create a `.env` file inside `backend/` if needed:

```env
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

The Prisma schema currently uses a local SQLite database:

```prisma
url = "file:./dev.db"
```

### Frontend

Create a `.env.local` file inside `frontend/` if your backend URL is different:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Main Pages

- `/` - Home page
- `/about` - About UniCompass
- `/colleges` - College discovery page
- `/colleges/[id]` - College details page
- `/compare` - College comparison page
- `/questions` - Q&A discussion page
- `/saved` - Saved colleges page
- `/login` - Login page
- `/register` - Registration page

## Available Scripts

### Backend

```bash
npm run dev
npm run build
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm start
npm run lint
```

## Notes

- Users must be logged in to save colleges, ask questions, and answer questions.
- The dark mode preference is saved in the browser using `localStorage`.
- The frontend expects the backend API to be available at `http://localhost:5000` unless `NEXT_PUBLIC_API_URL` is configured.

Author: Angela Bera  
Github: https://github.com/angelabera

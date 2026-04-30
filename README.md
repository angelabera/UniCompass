# 🎓 UniCompass - College Discovery Platform

> **Your ultimate guide to finding the perfect college**

UniCompass is a modern, full-stack college discovery platform that empowers students to explore institutions, compare options, save favorites, and connect with peers through a collaborative Q&A experience. Built with cutting-edge web technologies, UniCompass combines an intuitive interface with powerful features to help students make informed education decisions.

---

## ✨ Key Features

### 🔍 **Smart College Discovery**
- Advanced search with real-time filtering
- Filter by location, fees, and college type (Government/Private)
- Pagination for seamless browsing
- Detailed college profiles with ratings and statistics

### 📊 **Side-by-Side Comparison**
- Compare up to 4 colleges simultaneously
- View courses, placement statistics, and fees side by side
- Make data-driven decisions with visual comparisons

### 💾 **Personal Shortlist**
- Save favorite colleges to your personal dashboard
- Quick access to bookmarked institutions
- Organize your college search journey

### 💬 **Student Q&A Hub**
- Ask questions about colleges and courses
- Get answers from other students and community members
- Real-time discussions and peer insights
- Track questions by college

### 🔐 **Secure Authentication**
- User registration and login with email
- JWT-based session management
- Password hashing with bcrypt
- Persistent authentication

### 🌓 **Dark/Light Mode**
- Seamless theme switching
- Persistent user preference
- Eye-friendly interface for all lighting conditions

### 📱 **Fully Responsive Design**
- Mobile-first approach
- Smooth animations and transitions
- Glass morphism UI components
- Polished gradient-based design system

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Framer Motion** | Smooth animations & transitions |
| **Zustand** | Lightweight state management |
| **Axios** | HTTP client for API calls |
| **Lucide React** | Beautiful icon system |
| **js-cookie** | Cookie management |
| **jwt-decode** | JWT token decoding |

### **Backend**
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js 5** | Web framework |
| **TypeScript** | Type-safe JavaScript |
| **Prisma ORM 5** | Database abstraction layer |
| **PostgreSQL** | Production database |
| **JWT** | Secure authentication |
| **bcryptjs** | Password hashing |
| **CORS** | Cross-origin resource sharing |

### **Database**
| Environment | Database |
|-----------|----------|
| **Local Development** | SQLite (via Prisma) |
| **Production** | PostgreSQL (Neon) |

---

## 📁 Project Structure

```
UniCompass/
│
├── 📂 backend/
│   ├── src/
│   │   ├── index.ts              # Express app entry point
│   │   ├── db.ts                 # Prisma client initialization
│   │   ├── middleware/
│   │   │   └── auth.ts           # JWT authentication middleware
│   │   └── routes/
│   │       ├── auth.ts           # User registration & login
│   │       ├── colleges.ts       # College CRUD operations
│   │       ├── questions.ts      # Q&A functionality
│   │       └── saves.ts          # Save/bookmark colleges
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   ├── seed.ts               # Database seeding
│   │   └── migrations/           # Migration history
│   ├── .env                      # Local environment variables
│   ├── .env.production           # Production environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── 📂 frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Root layout
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── colleges/         # College discovery pages
│   │   │   ├── compare/          # College comparison
│   │   │   ├── questions/        # Q&A hub
│   │   │   ├── login/            # Authentication
│   │   │   ├── register/         # User registration
│   │   │   ├── saved/            # Saved colleges
│   │   │   └── about/            # About page
│   │   ├── components/           # Reusable components
│   │   ├── lib/                  # Utilities & API client
│   │   ├── store/                # Zustand store
│   │   ├── types/                # TypeScript definitions
│   │   └── globals.css           # Global styles
│   ├── .env.local                # Local environment variables
│   ├── .env.production           # Production environment variables
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
│
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v20 or higher
- **npm** or **yarn**
- **PostgreSQL** database (for production)

### Local Development Setup

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/angelabera/UniCompass.git
cd UniCompass
```

#### 2️⃣ Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npx prisma db seed

# Start development server
npm run dev
```

Backend runs on: `http://localhost:5000`

#### 3️⃣ Frontend Setup
Open a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:3000`

#### 4️⃣ Access the Application
Open your browser and navigate to: **`http://localhost:3000`**

---

## 📦 Build & Deployment

### Build for Production

**Backend:**
```bash
cd backend
npm run build
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

### Deployment Guide

#### **Option 1: Render + Vercel (Recommended)**

**Backend Deployment (Render):**
1. Push code to GitHub
2. Connect GitHub repository to [render.com](https://render.com)
3. Set build command: `npm install && npm run build && npx prisma migrate deploy && npx prisma db seed`
4. Add environment variables:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret-key
   PORT=3001
   NODE_ENV=production
   ```
5. Deploy!

**Database Setup (Neon):**
1. Create free PostgreSQL database at [neon.tech](https://neon.tech)
2. Copy connection string to `DATABASE_URL` in Render

**Frontend Deployment (Vercel):**
1. Connect GitHub to [vercel.com](https://vercel.com)
2. Select `frontend` directory
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-render-backend-url
   ```
4. Deploy!

#### **Option 2: Docker Deployment**

```dockerfile
# Dockerfile for backend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

---

## 🗄️ Database Schema

### Key Models
- **User**: Student accounts with authentication
- **College**: Institution information and metadata
- **Course**: Programs offered by colleges
- **Placement**: Placement statistics and data
- **SavedCollege**: User's bookmarked colleges
- **Question**: Student questions about colleges
- **Answer**: Responses to student questions

---

## 🔐 Environment Variables

### Backend (.env.production)
```env
DATABASE_URL=postgresql://user:password@host/database
JWT_SECRET=your-secure-secret-key
PORT=3001
NODE_ENV=production
```

### Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

---

## 📝 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Colleges
- `GET /colleges` - List all colleges with filters
- `GET /colleges/:id` - Get college details
- `GET /colleges/compare` - Compare multiple colleges

### Q&A
- `GET /questions` - Get all questions
- `POST /questions` - Create new question
- `POST /questions/:id/answers` - Add answer

### Saves
- `GET /save` - Get saved colleges
- `POST /save` - Save a college
- `DELETE /save/:id` - Remove saved college

---


## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Angela Bera**

---

## 🙏 Acknowledgments

- Built with ❤️ for students seeking their perfect college
- Inspired by the need for better college discovery tools
- Thanks to all contributors and users!


---

**Happy College Hunting! 🎓✨**

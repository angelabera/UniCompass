# 🗺️ UniCompass - Page Architecture & Product Surface Map

**Last Updated:** May 2026  
**Status:** Current Implementation + Future Roadmap

---

## 📋 Table of Contents

1. [Authentication Flow](#1-authentication-flow)
2. [Core Discovery Pages](#2-core-discovery-pages)
3. [College Pages](#3-college-pages)
4. [Tools & Utilities](#4-tools--utilities)
5. [Community & Content](#5-community--content)
6. [User Features](#6-user-features)
7. [Admin & Metadata Pages](#7-admin--metadata-pages)
8. [Data Flow Architecture](#8-data-flow-architecture)
9. [Routing Map](#9-routing-map)
10. [Future Roadmap](#10-future-roadmap)

---

## 1. Authentication Flow

### 1.1 Login Page
**Route:** `/login`  
**Status:** ✅ Implemented  
**File:** [frontend/src/app/login/page.tsx](../../frontend/src/app/login/page.tsx)  
**Purpose:** User authentication entry point

**Key Features:**
- Email & password input
- Form validation
- JWT token generation
- Redirect to dashboard on success
- Link to register page

**API Endpoint:**
- `POST /api/auth/login` → Backend validates credentials, returns JWT token

**Data Models:**
```
Input: { email, password }
Output: { token, user: { id, email, name } }
```

---

### 1.2 Register Page
**Route:** `/register`  
**Status:** ✅ Implemented  
**File:** [frontend/src/app/register/page.tsx](../../frontend/src/app/register/page.tsx)  
**Purpose:** New user account creation

**Key Features:**
- Name, email, password input
- Password confirmation
- Email uniqueness validation
- Auto-login after registration
- Link to login page

**API Endpoint:**
- `POST /api/auth/register` → Creates new user, returns JWT token

**Data Models:**
```
Input: { name, email, password }
Output: { token, user: { id, email, name } }
```

---

## 2. Core Discovery Pages

### 2.1 Homepage
**Route:** `/`  
**Status:** ✅ Implemented  
**File:** [frontend/src/app/page.tsx](../../frontend/src/app/page.tsx)  
**Purpose:** Marketing & product overview, primary entry point

**Key Sections:**
- Hero section with tagline
- Feature highlights (Smart Discovery, Decision Analytics, Student Q&A)
- Call-to-action buttons
- Navigation to key features
- Dark/light mode toggle

**User Journeys:**
- New visitors → Explore features → Browse colleges
- Returning users → Direct to favorites or dashboard

**API Calls:** None (static content with animations)

---

### 2.2 College Listing Page
**Route:** `/colleges`  
**Status:** ✅ Implemented  
**File:** [frontend/src/app/colleges/page.tsx](../../frontend/src/app/colleges/page.tsx)  
**Purpose:** Discover and filter colleges with advanced search capabilities

**Key Features:**
- Search bar (by college name)
- Filter panel:
  - Location (dropdown/multiselect)
  - Type (Government/Private)
  - Max Fees (slider/input)
- Pagination (10 items per page)
- College cards with:
  - Name & location
  - Type & fees
  - Ratings/stats
  - Quick save button
  - Click to details

**API Endpoints:**
- `GET /api/colleges?search={query}&location={loc}&maxFees={fees}&type={type}&page={n}&limit={n}`

**Data Models:**
```
College Card:
{
  id, name, location, type, fees, rating, 
  placementRate, avgSalary, savedCount
}
```

**Filters Workflow:**
```
User Input → URL Query Params → Backend Filter → Paginated Results → UI Render
```

---

### 2.3 College Detail Page
**Route:** `/colleges/[id]`  
**Status:** ✅ Implemented  
**File:** [frontend/src/app/colleges/[id]/page.tsx](../../frontend/src/app/colleges/[id]/page.tsx)  
**Purpose:** Deep dive into a single college with comprehensive information

**Key Sections:**
1. **Header**
   - College name & location
   - Save/unsave button
   - Rating & review count
   - Share button

2. **Overview Section**
   - College type & establishment year
   - Total fees
   - Contact information
   - Official website link

3. **Statistics Panel**
   - Placement rate
   - Average salary
   - Highest salary
   - Companies recruiting

4. **Courses Offered** (Planned)
   - List of available courses
   - Duration & eligibility
   - Specializations

5. **Student Testimonials** (Planned)
   - Real student experiences
   - Star ratings

6. **Q&A Section** (Integrated)
   - Questions specific to this college
   - Add new question button
   - Answer threads

7. **Map & Location** (Planned)
   - Campus location on map
   - Nearby facilities

**API Endpoints:**
- `GET /api/colleges/[id]` → Full college details
- `GET /api/colleges/[id]/courses` → Courses offered (Planned)
- `GET /api/questions?collegeId={id}` → College-specific questions

**Data Models:**
```
College Details:
{
  id, name, location, type, fees, rating,
  placementRate, avgSalary, maxSalary,
  companyList, year_established, website,
  phone, email, address, courses[], questions[]
}
```

---

## 3. College Pages (Future)

### 3.1 Courses/Specializations Page
**Route:** `/colleges/[id]/courses`  
**Status:** 📅 Planned  
**Purpose:** Browse programs offered at a specific college

**Features:**
- List of all courses
- Filter by duration (2yr, 4yr, etc.)
- Filter by stream (Engineering, Commerce, Arts)
- Enrollment numbers
- Eligibility requirements
- Fee structure per course
- Placement outcomes per course

**API Endpoints:**
- `GET /api/colleges/[id]/courses`
- `GET /api/courses/[courseId]/statistics`

---

### 3.2 Placement Statistics Page
**Route:** `/colleges/[id]/placements`  
**Status:** 📅 Planned  
**Purpose:** Deep-dive into placement data by course

**Features:**
- Year-wise placement trends
- Company-wise recruitment
- Salary distribution charts
- Course-wise placement rates
- Department rankings

**API Endpoints:**
- `GET /api/colleges/[id]/placements`
- `GET /api/colleges/[id]/placements/chart-data`

---

## 4. Tools & Utilities

### 4.1 Compare Colleges Tool
**Route:** `/compare`  
**Status:** ✅ Implemented  
**File:** [frontend/src/app/compare/page.tsx](../../frontend/src/app/compare/page.tsx)  
**Purpose:** Side-by-side comparison of up to 4 colleges

**Key Features:**
- Select colleges (via search/autocomplete)
- Display up to 4 colleges simultaneously
- Comparison matrix:
  - Basic info (location, type, year)
  - Financial (fees, avg salary)
  - Academic (courses, placement rate)
  - Infrastructure (facilities, labs)
- Remove college from comparison
- Add new college button
- Print/export comparison
- Share comparison link (Planned)

**API Endpoints:**
- `GET /api/colleges?ids={id1},{id2},{id3},{id4}` → Fetch compare data

**Data Models:**
```
ComparisonMatrix:
{
  colleges: College[],
  metrics: {
    financialMetrics: {},
    academicMetrics: {},
    infrastructureMetrics: {}
  }
}
```

---

### 4.2 College Predictor Tool (Planned)
**Route:** `/tools/predictor`  
**Status:** 📅 Planned  
**Purpose:** Help students estimate college admission chances

**Features:**
- Input student scores (JEE/NEET/Board exam)
- Input preferences (stream, location, budget)
- Get matching colleges with admission probability
- Save prediction results
- Share with friends

**API Endpoints:**
- `POST /api/tools/predictor` → ML-based prediction
- `GET /api/tools/predictor/history` → User's past predictions

---

### 4.3 College Finder Tool (Planned)
**Route:** `/tools/finder`  
**Status:** 📅 Planned  
**Purpose:** Recommended colleges based on student profile

**Features:**
- Questionnaire:
  - Budget range
  - Preferred location
  - Stream preference
  - Placement importance
  - Infrastructure requirements
- Smart matching algorithm
- Show top 5-10 recommendations
- Rationale for each recommendation

**API Endpoints:**
- `POST /api/tools/finder` → Generate recommendations
- `GET /api/tools/finder/results/{resultId}`

---

## 5. Community & Content

### 5.1 Q&A Hub / Community
**Route:** `/questions`  
**Status:** ✅ Implemented  
**File:** [frontend/src/app/questions/page.tsx](../../frontend/src/app/questions/page.tsx)  
**Purpose:** Student-to-student Q&A platform

**Key Features:**
- Browse all questions (newest first)
- Search questions
- Filter by college
- Filter by category/topic
- Ask new question (authenticated)
- Answer threads
- Upvote/downvote helpful answers (Planned)
- Mark helpful answer
- User reputation system (Planned)

**Page Layout:**
1. **Header**
   - Search bar
   - Filters (college, category, date)
   - Ask question button

2. **Questions List**
   - Question title
   - Asked by (user name)
   - College mentioned
   - Answer count
   - Views count
   - Time posted

3. **Question Detail** (Modal/Detail View)
   - Full question
   - All answers with author info
   - Add answer form
   - Timestamp

**API Endpoints:**
- `GET /api/questions` → All questions
- `GET /api/questions?collegeId={id}` → College-specific
- `POST /api/questions` → Create question (auth required)
- `POST /api/questions/{id}/answers` → Add answer (auth required)
- `GET /api/questions/{id}` → Single question with answers

**Data Models:**
```
Question:
{
  id, content, userId, collegeId, createdAt,
  author: { id, name, email },
  college: { id, name },
  answers: Answer[],
  viewCount, answerCount
}

Answer:
{
  id, content, userId, questionId, createdAt,
  user: { id, name, email },
  upvotes, downvotes
}
```

---

### 5.2 Articles / Blog (Planned)
**Route:** `/articles`  
**Status:** 📅 Planned  
**Purpose:** Educational content about college selection

**Features:**
- Browse college selection guides
- Topics: "How to Choose College", "Career After College", etc.
- Search & categorize articles
- Read time indicator
- Author info
- Comments on articles

**API Endpoints:**
- `GET /api/articles`
- `GET /api/articles/{id}`
- `GET /api/articles?category={cat}&search={q}`

---

### 5.3 Rankings / Collections (Planned)
**Route:** `/rankings`  
**Status:** 📅 Planned  
**Purpose:** Curated college rankings and lists

**Pages:**
- Top colleges by placement
- Best colleges by fees (budget-friendly)
- Best colleges by location
- Top colleges by rating/reviews
- Community favorites
- Hidden gems (underrated colleges)

**Features:**
- Sortable rankings
- Filter by criteria
- Save collections to favorites
- Share rankings

---

## 6. User Features

### 6.1 Saved/Bookmarks Page
**Route:** `/saved`  
**Status:** ✅ Implemented  
**File:** [frontend/src/app/saved/page.tsx](../../frontend/src/app/saved/page.tsx)  
**Purpose:** Personal shortlist of saved colleges

**Key Features:**
- Grid/list view toggle
- Sort options:
  - Recently saved
  - Alphabetical
  - Fees (low to high)
  - Rating (high to low)
- Filter by type/location
- Remove from saved
- Quick compare (select multiple)
- Notes/tags per college (Planned)

**API Endpoints:**
- `GET /api/saves` → User's saved colleges (auth required)
- `POST /api/saves` → Save college (auth required)
- `DELETE /api/saves/{collegeId}` → Remove save (auth required)

**Data Models:**
```
SavedCollege:
{
  id, userId, collegeId, createdAt,
  college: College,
  notes?: string,
  tags?: string[]
}
```

---

### 6.2 User Dashboard (Planned)
**Route:** `/dashboard`  
**Status:** 📅 Planned  
**Purpose:** Personalized user home after login

**Features:**
- Quick stats:
  - Colleges saved
  - Questions asked
  - Answers given
  - Profile completion %
- Recent activity
- Recommendations
- Suggested colleges based on views

---

### 6.3 User Profile (Planned)
**Route:** `/profile`  
**Status:** 📅 Planned  
**Purpose:** User account management

**Features:**
- Edit profile info
- Change password
- Notification preferences
- View activity history
- Delete account option
- Download data (GDPR)

---

### 6.4 Saved Questions/Bookmarks (Planned)
**Route:** `/saved/questions`  
**Status:** 📅 Planned  
**Purpose:** Bookmark helpful Q&A threads

---

## 7. Admin & Metadata Pages

### 7.1 About Page
**Route:** `/about`  
**Status:** ✅ Implemented  
**File:** [frontend/src/app/about/page.tsx](../../frontend/src/app/about/page.tsx)  
**Purpose:** About UniCompass platform

**Content:**
- Mission & vision
- Team introduction
- Features overview
- Contact information
- FAQ section

---

### 7.2 Terms & Conditions (Planned)
**Route:** `/terms`  
**Status:** 📅 Planned  

---

### 7.3 Privacy Policy (Planned)
**Route:** `/privacy`  
**Status:** 📅 Planned  

---

### 7.4 Help / FAQ (Planned)
**Route:** `/help`  
**Status:** 📅 Planned  

---

## 8. Data Flow Architecture

### 8.1 Authentication Flow
```
┌─────────────────┐
│  Login/Register │
└────────┬────────┘
         │ email + password
         ↓
┌──────────────────────────┐
│  Backend Auth Service    │
│  - Validate credentials  │
│  - Hash password         │
│  - Generate JWT token    │
└────────┬─────────────────┘
         │ JWT token
         ↓
┌──────────────────────────┐
│  Frontend Auth Provider  │
│  - Store token (cookie)  │
│  - Set user context      │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│  Protected Routes        │
│  - Dashboard             │
│  - Saved colleges        │
│  - Ask questions         │
└──────────────────────────┘
```

### 8.2 College Discovery Flow
```
┌──────────────────────────┐
│  User on /colleges page  │
└────────┬─────────────────┘
         │ Enter filters
         ↓
┌──────────────────────────┐
│  Filter Panel            │
│  - Location              │
│  - Type                  │
│  - Max Fees              │
│  - Search term           │
└────────┬─────────────────┘
         │ Query params
         ↓
┌──────────────────────────────────┐
│  Backend: GET /colleges?filters   │
│  - Apply WHERE clause             │
│  - Pagination (skip, limit)       │
│  - Sort results                   │
└────────┬─────────────────────────┘
         │ Colleges array
         ↓
┌──────────────────────────┐
│  Frontend Display        │
│  - College cards grid    │
│  - Pagination controls   │
└────────┬─────────────────┘
         │ Click college
         ↓
┌──────────────────────────────────┐
│  Navigate to /colleges/[id]       │
│  Fetch detailed data              │
└──────────────────────────────────┘
```

### 8.3 Save/Bookmark Flow
```
┌──────────────────────────┐
│  View College Detail     │
└────────┬─────────────────┘
         │ Click save button
         ↓
┌──────────────────────────┐
│  Check if user logged in │
└────────┬─────────────────┘
         │ YES / NO
      ┌──┴──┐
      │     │
   YES│     │NO
      │     └──→ Redirect to /login
      │
      ↓
┌──────────────────────────────────┐
│  POST /api/saves                 │
│  { userId, collegeId }           │
│  with JWT auth header            │
└────────┬─────────────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│  Backend: Create SavedCollege     │
│  - Check user exists             │
│  - Check college exists          │
│  - Prevent duplicates            │
└────────┬─────────────────────────┘
         │ success/error
         ↓
┌──────────────────────────┐
│  Update UI               │
│  - Toggle save button    │
│  - Show toast message    │
└──────────────────────────┘
```

---

## 9. Routing Map

### Complete URL Structure

```
/                                    → Homepage
├── /login                           → Login page
├── /register                        → Register page
│
├── /colleges                        → Colleges listing
│   └── /colleges/[id]              → College detail
│       ├── /colleges/[id]/courses  → College courses (Planned)
│       └── /colleges/[id]/placements → Placement data (Planned)
│
├── /compare                         → Compare tool
│
├── /questions                       → Q&A hub
│   └── /questions/[id]             → Question detail (Planned)
│
├── /saved                           → Saved colleges
│   └── /saved/questions            → Saved questions (Planned)
│
├── /tools                           → Tools section (Planned)
│   ├── /tools/predictor            → College predictor (Planned)
│   └── /tools/finder               → College finder (Planned)
│
├── /rankings                        → College rankings (Planned)
│   ├── /rankings/placement         → By placement rate (Planned)
│   ├── /rankings/affordable        → Budget-friendly (Planned)
│   └── /rankings/location          → By location (Planned)
│
├── /articles                        → Blog/articles (Planned)
│   └── /articles/[slug]            → Article detail (Planned)
│
├── /dashboard                       → User dashboard (Planned)
├── /profile                         → User profile (Planned)
│
├── /about                           → About page
├── /terms                           → Terms & conditions (Planned)
├── /privacy                         → Privacy policy (Planned)
└── /help                            → Help & FAQ (Planned)
```

---

## 10. Backend API Structure

### Core Endpoint Groups

```
POST   /api/auth/register           → Register user
POST   /api/auth/login              → Login user
POST   /api/auth/logout             → Logout (Planned)
GET    /api/auth/me                 → Current user (Planned)

GET    /api/colleges                → List colleges (with filters)
GET    /api/colleges/:id            → Get college detail
POST   /api/colleges                → Create college (admin only, Planned)
PUT    /api/colleges/:id            → Update college (admin only, Planned)

GET    /api/saves                   → Get user's saved colleges (auth)
POST   /api/saves                   → Save college (auth)
DELETE /api/saves/:collegeId        → Unsave college (auth)

GET    /api/questions               → List questions
GET    /api/questions/:id           → Get question with answers
POST   /api/questions               → Create question (auth)
POST   /api/questions/:id/answers   → Add answer (auth)

GET    /api/tools/predictor         → Predictor (Planned)
GET    /api/tools/finder            → Finder (Planned)
GET    /api/rankings                → Rankings data (Planned)
```

---

## 11. Future Roadmap

### Phase 2: Enhanced Features
- [ ] Course-specific pages
- [ ] Placement analytics dashboard
- [ ] College predictor tool
- [ ] Smart college finder
- [ ] Rankings by various criteria

### Phase 3: Community & Engagement
- [ ] Articles/blog platform
- [ ] User reputation system
- [ ] Upvote/downvote system
- [ ] User profile pages
- [ ] Follow colleges/users
- [ ] Notifications

### Phase 4: Advanced Tools
- [ ] Virtual college tours
- [ ] Live chat with colleges
- [ ] PDF/export functionality
- [ ] Advanced data analytics
- [ ] Mobile app

### Phase 5: Enterprise
- [ ] Admin dashboard
- [ ] College management portal
- [ ] Analytics & reporting
- [ ] Bulk data import

---

## 12. Component Hierarchy

### Authentication Wrapper
```
AuthProvider (context)
├── Protected Routes (with auth check)
│   ├── /saved
│   ├── /dashboard (Planned)
│   ├── /profile (Planned)
│   └── Questions/Answers (create)
└── Public Routes
    ├── /
    ├── /colleges
    ├── /colleges/[id]
    ├── /compare
    ├── /questions
    ├── /about
    └── /login, /register
```

### Layout Structure
```
App Root
├── Navbar
│   ├── Logo
│   ├── Navigation Links
│   ├── Search Bar
│   ├── Theme Toggle
│   └── User Menu / Login Button
│
├── Page Content
│   ├── Specific Page Components
│   └── Modals/Overlays
│
└── Footer
    ├── Links
    ├── Social
    └── Copyright
```

---

## 13. Data Schema Overview

### User
```prisma
model User {
  id          String @id @default(cuid())
  email       String @unique
  name        String
  password    String
  createdAt   DateTime @default(now())
  
  // Relations
  savedColleges  SavedCollege[]
  questions      Question[]
  answers        Answer[]
}
```

### College
```prisma
model College {
  id              String @id @default(cuid())
  name            String
  location        String
  type            String  // Government/Private
  fees            Float
  rating          Float
  placementRate   Float
  avgSalary       Float
  maxSalary       Float
  companyList     String  // JSON or string
  website         String
  phone           String
  email           String
  address         String
  yearEstablished Int
  
  // Relations
  savedBy         SavedCollege[]
  questions       Question[]
  courses         Course[]  // Planned
  placements      Placement[]  // Planned
}
```

### SavedCollege
```prisma
model SavedCollege {
  id        String @id @default(cuid())
  userId    String
  collegeId String
  createdAt DateTime @default(now())
  
  // Relations
  user      User @relation(fields: [userId], references: [id])
  college   College @relation(fields: [collegeId], references: [id])
}
```

### Question & Answer
```prisma
model Question {
  id        String @id @default(cuid())
  content   String
  userId    String
  collegeId String
  createdAt DateTime @default(now())
  
  // Relations
  user      User @relation(fields: [userId], references: [id])
  college   College @relation(fields: [collegeId], references: [id])
  answers   Answer[]
}

model Answer {
  id         String @id @default(cuid())
  content    String
  userId     String
  questionId String
  createdAt  DateTime @default(now())
  
  // Relations
  user       User @relation(fields: [userId], references: [id])
  question   Question @relation(fields: [questionId], references: [id])
}
```

---

## 14. Key Statistics & Metrics to Track

- **Page Views:** Per page, per feature
- **User Journeys:** Entry → College view → Save → Comparison
- **Engagement:** Questions asked, answers provided, saves per user
- **Search Metrics:** Popular search terms, filter combinations
- **Conversion:** Login rate, save rate, question participation rate
- **Performance:** Page load times, API response times

---

## 15. Notes for Implementation

### Priority Order
1. ✅ Auth & core discovery (DONE)
2. ✅ Compare tool (DONE)
3. ✅ Q&A hub (DONE)
4. 🔄 Course pages (UP NEXT)
5. 📅 Analytics & placements
6. 📅 Tools (predictor, finder)
7. 📅 Community features
8. 📅 Admin panel

### Technical Considerations
- Use dynamic routing `[id]` pattern for detail pages
- Implement proper error boundaries for 404s
- Add loading skeletons for better UX
- Use React Query or SWR for data fetching
- Pagination for large datasets
- Caching strategy for frequently accessed data

---

**Document maintained by:** Engineering Team  
**Last Updated:** May 5, 2026  
**Questions?** Refer to individual route implementations or backend API docs

# 🗺️ UniCompass - Page Architecture & Product Surface Map

**Last Updated:** May 2026  
**Status:** Current Implementation + Future Roadmap

---

## 📋 Table of Contents

1. [Feature & Data Deconstruction](#0-feature--data-deconstruction-detailed-breakdown)
2. [Authentication Flow](#1-authentication-flow)
3. [Core Discovery Pages](#2-core-discovery-pages)
4. [College Pages](#3-college-pages)
5. [Tools & Utilities](#4-tools--utilities)
6. [Community & Content](#5-community--content)
7. [User Features](#6-user-features)
8. [Admin & Metadata Pages](#7-admin--metadata-pages)
9. [Data Model & Database Schema](#8-data-model--database-schema)
10. [Data Flow Architecture](#9-data-flow-architecture)
11. [Routing Map](#10-routing-map)
12. [Competitive Analysis & Market Positioning](#11-competitive-analysis--market-positioning)
13. [Future Roadmap](#12-future-roadmap)

---

## 0. Feature & Data Deconstruction (Detailed Breakdown)

### Page: Login Page
**Route:** `/login` | **Status:** ✅ Implemented

**Objective:** Enable user authentication and access to protected features

**Features:**
- Email input field (with validation)
- Password input field (masked)
- Form validation & error messages
- Submit button
- "Remember me" checkbox (Planned)
- Social login buttons (Planned)
- Forgot password link (Planned)
- Link to register page
- Loading state during submission

**Data Points (Form Inputs):**
- Email: string (required, valid email format)
- Password: string (required, min 6 chars)

**Data Points (Response):**
- token: string (JWT)
- user.id: string
- user.email: string
- user.name: string
- expiresIn: number (optional)

**UI Components:**
- Header (title, subtitle)
- Email input box
- Password input box
- Error message container
- Submit button
- Link to register
- Footer links

---

### Page: Register Page
**Route:** `/register` | **Status:** ✅ Implemented

**Objective:** Allow new users to create an account

**Features:**
- Full name input field
- Email input field
- Password input field
- Password confirmation field
- Form validation with real-time feedback
- Email uniqueness validation
- Submit button
- Link to login page
- Terms & conditions checkbox (Planned)
- Auto-login after successful registration

**Data Points (Form Inputs):**
- name: string (required, min 2 chars, max 50 chars)
- email: string (required, valid format, unique)
- password: string (required, min 6 chars)
- passwordConfirm: string (required, must match password)

**Data Points (Response):**
- token: string (JWT)
- user.id: string
- user.email: string
- user.name: string

**UI Components:**
- Header (title, subtitle)
- Name input box
- Email input box
- Password input box
- Confirm password input box
- Password strength indicator (Planned)
- Error message container
- Submit button
- Link to login
- Terms checkbox

---

### Page: Homepage
**Route:** `/` | **Status:** ✅ Implemented

**Objective:** Introduce platform, showcase key features, guide users to discovery

**Features:**
- Hero section with animated headline
- Feature cards (3 main features)
- Call-to-action buttons
- Navigation to colleges section
- Navigation to Q&A section
- Statistics/metrics about platform (Planned)
- User testimonials (Planned)
- Dark/light theme toggle
- Smooth scroll animations

**Data Points (Static Content):**
- Hero tagline: string
- Hero subtitle: string
- Feature 1 title: string
- Feature 1 description: string
- Feature 1 icon: icon component
- Feature 2 title: string
- Feature 2 description: string
- Feature 2 icon: icon component
- Feature 3 title: string
- Feature 3 description: string
- Feature 3 icon: icon component
- CTA button text: string
- CTA button link: URL

**Data Points (Dynamic - Planned):**
- totalColleges: number
- totalUsers: number
- totalQuestions: number
- totalAnswers: number
- userTestimonials: array of {quote, author, role, avatar}

**UI Components:**
- Navbar with logo & nav links
- Hero banner section
- Feature cards grid
- Statistics section (Planned)
- Testimonials section (Planned)
- CTA section
- Footer

---

### Page: College Listing Page
**Route:** `/colleges` | **Status:** ✅ Implemented

**Objective:** Discover, filter, and shortlist colleges

**Features:**
- Search bar (real-time search by name)
- Filter panel (collapsible on mobile)
- Pagination (page numbers + previous/next)
- College cards grid
- View toggle (grid/list view, Planned)
- Sort dropdown
- Filter tags display
- Clear filters button
- Result count display
- Load more / infinite scroll (Planned)

**Filters:**
- Location (dropdown/multiselect)
- College Type (Government/Private)
- Max Fees (range slider)
- Search term (text input)
- Exam type (JEE/NEET/Board, Planned)
- Rating (star filter, Planned)
- Course availability (multiselect, Planned)

**Data Points (College Card):**
- id: string
- name: string
- location: string (city, state)
- type: string (Government/Private)
- fees: number
- rating: number (0-5)
- placementRate: number (percentage)
- avgSalary: number
- isSaved: boolean
- courseCount: number (Planned)
- reviewCount: number (Planned)
- established: year (Planned)

**Data Points (Filter State):**
- search: string
- location: string[]
- type: string
- maxFees: number
- page: number
- limit: number (per page)
- sortBy: string (relevance, fees, rating, etc.)

**Data Points (Response Metadata):**
- total: number (total results)
- page: number
- limit: number
- hasMore: boolean
- totalPages: number

**UI Components:**
- Search input
- Filter sidebar
- Location filter dropdown
- Type radio buttons
- Fees slider
- Exam type checkboxes (Planned)
- Rating filter (Planned)
- College card component
- Pagination controls
- Result counter
- No results message

---

### Page: College Detail Page
**Route:** `/colleges/[id]` | **Status:** ✅ Implemented

**Objective:** Provide comprehensive college information for informed decision

**Features:**
- College header with name, location, type
- Save/bookmark button
- Share button (Planned)
- College stats panel
- Overview/details section
- Courses section (Planned)
- Placement statistics section (Planned)
- Q&A section (college-specific)
- Student reviews section (Planned)
- Gallery/images (Planned)
- Contact information
- Map/location (Planned)
- Similar colleges recommendations (Planned)

**Data Points (Header Section):**
- id: string
- name: string
- location: string (full address)
- state: string
- city: string
- type: string (Government/Private)
- established: year
- rating: number
- reviewCount: number
- isSaved: boolean (user-specific)

**Data Points (Overview/Details):**
- website: URL
- phone: string
- email: string
- address: string
- coordinates: {lat, long}
- streams: string[] (Engineering, Commerce, etc.)
- totalStudents: number
- facultyCount: number
- campusArea: number (in acres)
- hostels: boolean
- hostelCapacity: number (if applicable)

**Data Points (Statistics/Metrics):**
- placementRate: number (percentage)
- placedStudents: number
- avgSalary: number
- maxSalary: number
- minSalary: number
- salaryGrowth: number
- topRecruiter: string
- topRecruiters: string[] (array of company names)
- industries: string[]
- averagePackage: number
- medianPackage: number
- placementYear: year

**Data Points (Academic):**
- totalCourses: number
- courseList: array of {name, duration, stream, fees}
- facultyQualification: string (avg degree level)
- accreditations: string[]

**Data Points (Q&A Section):**
- questions: array of {id, title, answerCount, lastActive}
- totalQuestionsAboutCollege: number

**UI Components:**
- Header banner
- College info card
- Save button
- Share button
- Stats grid (4 key metrics)
- Tabs (Overview, Courses, Placements, Q&A, Reviews)
- Contact info section
- Map embed
- Questions feed
- Reviews list
- Similar colleges carousel

---

### Page: Courses/Specializations Page
**Route:** `/colleges/[id]/courses` | **Status:** 📅 Planned

**Objective:** Browse available programs, specializations, and eligibility

**Features:**
- Courses list table/cards
- Filter by duration (2yr, 4yr, etc.)
- Filter by stream (Engineering, Commerce, Arts)
- Course cards with details
- Expand/collapse for full description
- Fee structure per course
- Eligibility requirements
- Placement stats per course
- Enrollment capacity
- Application status (Planned)
- Prerequisite courses (Planned)

**Filters:**
- Stream (Engineering, Commerce, Arts, Science)
- Duration (1yr, 2yr, 3yr, 4yr, 5yr)
- Fee range
- Placement rate
- Search by course name

**Data Points (Course Card):**
- id: string
- name: string
- stream: string
- duration: string (e.g., "4 years")
- fees: number (total course fee)
- semesterFee: number
- placementRate: number (%)
- avgSalary: number
- totalSeats: number
- enrolledSeats: number
- availableSeats: number
- eligibility: string (description)
- prerequisiteCourses: string[]
- specializations: string[]
- topRecruiters: string[]
- careerOutcomes: string[]

**UI Components:**
- Courses filter panel
- Course card component
- Course detail modal
- Fees breakdown table
- Placement stats chart
- Eligibility box
- Apply button (Planned)

---

### Page: Placement Statistics Page
**Route:** `/colleges/[id]/placements` | **Status:** 📅 Planned

**Objective:** Deep-dive into placement data and outcomes

**Features:**
- Year-wise placement trends (line chart)
- Company-wise recruitment breakdown (table/cards)
- Salary distribution chart
- Salary by stream/course (grouped bars)
- Top recruiters list
- Filter by year
- Filter by stream/course
- Placement statistics cards
- Industry distribution (pie chart)
- Department ranking (Planned)
- Internship statistics (Planned)

**Filters:**
- Year (last 5 years)
- Stream/Course
- Department (if applicable)
- Internship/Placement toggle

**Data Points (Overview Stats):**
- yearOnYear: number (%)
- placementRate: number (%)
- placedStudents: number
- totalStudents: number
- internshipRate: number (%)
- averagePackage: number
- medianPackage: number
- maxPackage: number
- minPackage: number
- salaryGrowth: number (YoY %)

**Data Points (Year-wise Breakdown):**
- year: number
- placementRate: number
- avgSalary: number
- studentsPlaced: number
- topCompany: string
- topSalary: number

**Data Points (Company-wise Breakdown):**
- companyName: string
- studentsHired: number
- averagePackage: number
- roles: string[]
- industry: string
- yearsRecruiting: number

**Data Points (Salary Metrics):**
- salary: number
- frequency: number (count)

**Data Points (Stream-wise Breakdown):**
- stream: string
- placementRate: number
- avgSalary: number
- studentsPlaced: number

**UI Components:**
- Statistics cards grid
- Line chart (year trends)
- Bar chart (salary by stream)
- Pie chart (industry distribution)
- Company table/cards
- Filter controls
- Export button (Planned)

---

### Page: Compare Colleges Tool
**Route:** `/compare` | **Status:** ✅ Implemented

**Objective:** Side-by-side comparison of multiple colleges for informed choice

**Features:**
- College selector (search + autocomplete)
- Add up to 4 colleges
- Remove college button
- Comparison matrix (table view)
- Category tabs (Basic, Financial, Academic, Infrastructure)
- Sticky header for easy navigation
- Print/export functionality (Planned)
- Share comparison link (Planned)
- Highlight best value (Planned)
- Color-coded comparisons (Planned)

**Data Points (Basic Info Section):**
- name: string
- location: string
- type: string
- established: year
- website: URL
- phone: string
- rating: number
- reviewCount: number

**Data Points (Financial Section):**
- totalFees: number
- annualFees: number
- semesterFees: number
- hostelFees: number
- avgPlacement: number
- avgSalary: number
- maxSalary: number
- roiIndex: number (Planned)

**Data Points (Academic Section):**
- totalCourses: number
- topCourses: string[]
- accreditations: string[]
- facultyQualification: string
- studentTeacherRatio: number
- courseStreams: string[]
- specializations: string[]

**Data Points (Infrastructure Section):**
- libraryBooks: number
- labCount: number
- computerLabs: number
- internshipRate: number
- hostelCapacity: number
- campusArea: number
- sportsFacilities: string[]
- medicalCenter: boolean
- cafeteria: boolean

**Data Points (Comparison Metadata):**
- selectedColleges: College[] (up to 4)
- categories: string[] (Basic, Financial, Academic, Infrastructure)
- timestamp: datetime
- userId: string (if authenticated)

**UI Components:**
- College search/selector
- Selected colleges display
- Comparison matrix table
- Category tabs
- Metric comparison cards
- Remove college button
- Print button
- Share button

---

### Page: Q&A Hub / Community
**Route:** `/questions` | **Status:** ✅ Implemented

**Objective:** Crowdsourced knowledge platform for student questions

**Features:**
- Search questions bar
- Filter by college
- Filter by category (Planned)
- Filter by date (newest, trending, unanswered)
- Sort options (relevance, newest, most answered)
- Questions list
- Question cards with metadata
- Ask new question button
- Answer threads (expandable)
- Upvote/downvote answers (Planned)
- Mark helpful answer (Planned)
- User reputation display (Planned)
- Search highlights (Planned)

**Filters:**
- Search term (full text)
- College (dropdown/multiselect)
- Category/Topic (Planned)
- Sort by (newest, trending, unanswered)
- Date range (Planned)
- Answered/Unanswered toggle

**Data Points (Question Card - List View):**
- id: string
- title: string
- content: string (snippet)
- userId: string
- username: string
- collegeId: string
- collegeName: string
- category: string (Planned)
- tags: string[] (Planned)
- answerCount: number
- viewCount: number
- upvotes: number (Planned)
- createdAt: timestamp
- lastActivityAt: timestamp
- hasAcceptedAnswer: boolean (Planned)
- isAnswered: boolean

**Data Points (Question Detail View):**
- id: string
- title: string
- content: string (full)
- userId: string
- user.name: string
- user.avatar: URL (Planned)
- user.reputation: number (Planned)
- collegeId: string
- college.name: string
- createdAt: timestamp
- updatedAt: timestamp
- viewCount: number
- tags: string[]
- relatedQuestions: Question[] (Planned)

**Data Points (Answer Card):**
- id: string
- content: string
- userId: string
- user.name: string
- user.avatar: URL (Planned)
- user.reputation: number (Planned)
- questionId: string
- createdAt: timestamp
- upvotes: number
- downvotes: number
- isAccepted: boolean (Planned)
- replies: Answer[] (Planned, for nested replies)

**Data Points (Add Question Form):**
- title: string (required, min 10, max 200 chars)
- content: string (required, min 20 chars)
- collegeId: string (required)
- tags: string[] (optional, Planned)
- category: string (optional, Planned)

**Data Points (Add Answer Form):**
- content: string (required, min 20 chars)
- questionId: string (required)
- attachments: File[] (optional, Planned)

**UI Components:**
- Search input box
- Filter sidebar
- Sort dropdown
- Question list view
- Question card component
- Question detail modal/page
- Answer section
- Add answer form
- Upvote/downvote buttons
- User info card
- Related questions (Planned)

---

### Page: Saved/Bookmarks Page
**Route:** `/saved` | **Status:** ✅ Implemented

**Objective:** Manage personal shortlist of colleges

**Features:**
- Grid/list view toggle
- Sort options (recently saved, alphabetical, fees, rating)
- Filter by type (Planned)
- Filter by location (Planned)
- College cards with full details
- Remove from saved button
- Quick compare (select multiple)
- Compare selected button
- Select all / deselect all (Planned)
- Bulk actions (delete, add notes, Planned)
- Notes per college (Planned)
- Tags for colleges (Planned)
- Empty state message

**Sort Options:**
- Recently saved
- A-Z alphabetically
- Fees (low to high)
- Fees (high to low)
- Rating (high to low)
- Rating (low to high)

**Filters:**
- College type (Government/Private)
- Location
- Fee range (Planned)
- Rating range (Planned)

**Data Points (Saved College Card):**
- id: string
- collegeId: string
- collegeName: string
- location: string
- type: string
- fees: number
- rating: number
- placementRate: number
- avgSalary: number
- isSaved: boolean (always true here)
- savedDate: timestamp
- notes: string (optional, Planned)
- tags: string[] (optional, Planned)
- compareSelected: boolean

**Data Points (User Save List Metadata):**
- userId: string
- totalSaved: number
- lastUpdated: timestamp
- savedItems: SavedCollege[]

**UI Components:**
- Header with count
- View toggle (grid/list)
- Sort dropdown
- Filter panel
- College card
- Remove button
- Compare checkbox
- Compare selected button
- Bulk action menu (Planned)
- Empty state

---

### Page: College Predictor Tool
**Route:** `/tools/predictor` | **Status:** 📅 Planned

**Objective:** Estimate college admission chances based on student profile

**Features:**
- Input form for student scores
- Score type selector (JEE/NEET/Board exam)
- Score input fields
- Preferences questionnaire (stream, location, budget)
- Get recommendations button
- Results display with probability bars
- College matches list (with chance %, Planned)
- Save prediction results (auth required)
- Share prediction link
- View prediction history (Planned)
- Compare multiple predictions (Planned)

**Data Points (Input Form):**
- examType: string (JEE/NEET/Board)
- score: number
- maxScore: number
- rank: number (if applicable)
- percentile: number (if applicable)
- stream: string (Engineering, Medical, Commerce, Arts)
- preferredLocation: string[]
- budgetRange: {min, max}
- collegePriority: string (Reputation, Placements, Location, etc.)
- categoryReserved: string (General, OBC, SC, ST, EWS, Planned)

**Data Points (Prediction Results):**
- predictionId: string
- studentId: string
- examType: string
- score: number
- results: array of {
    - collegeId: string
    - collegeName: string
    - admissionChance: number (%)
    - category: string (Definitely, Likely, Possible, Unlikely)
    - cutoff: number
    - cutoffYear: year
    - rank: number (student's relative rank)
  }
- timestamp: datetime
- validity: datetime (when prediction expires, Planned)

**UI Components:**
- Score input form
- Preferences form
- Results cards
- Chance probability bar
- Filter results
- Save button
- Share button

---

### Page: College Finder Tool
**Route:** `/tools/finder` | **Status:** 📅 Planned

**Objective:** Smart college recommendations based on student profile

**Features:**
- Multi-step questionnaire
- Question with radio/checkbox/slider options
- Progress indicator
- Previous/Next buttons
- Get recommendations button
- Results display with recommendations
- Rationale for each recommendation
- Filter results
- Save finder results
- Share results link

**Questionnaire Questions:**
- Budget range (slider)
- Preferred locations (multiselect)
- Stream preference (radio)
- Placement importance (slider 1-10)
- Infrastructure priority (multiselect)
- Course preference (dropdown)
- College type preference (radio: Government/Private/Both)
- Distance from home (slider)
- Hostel availability importance (radio)
- Research opportunities importance (slider, Planned)
- International exposure importance (slider, Planned)

**Data Points (Questionnaire Response):**
- studentId: string (optional if not auth)
- budgetMin: number
- budgetMax: number
- locations: string[]
- stream: string
- placementWeight: number (1-10)
- infrastructurePriorities: string[]
- coursePreference: string
- collegeType: string
- maxDistance: number
- hostelRequired: boolean
- researchImportance: number (Planned)
- internationalExposure: number (Planned)

**Data Points (Recommendation Result):**
- resultId: string
- studentId: string (optional)
- timestamp: datetime
- recommendations: array of {
    - collegeId: string
    - collegeName: string
    - matchScore: number (0-100)
    - rank: number (1-10)
    - matchReasons: string[]
    - pros: string[]
    - cons: string[]
    - bestFor: string
  }
- savedResults: boolean

**UI Components:**
- Question cards
- Progress bar
- Radio/checkbox inputs
- Slider components
- Previous/Next buttons
- Results list
- Result card with rationale
- Save button
- Share button

---

### Page: Articles / Blog
**Route:** `/articles` | **Status:** 📅 Planned

**Objective:** Educational content about college selection, careers

**Features:**
- Articles list view
- Search articles
- Filter by category
- Filter by date
- Sort by (newest, trending, most read)
- Article cards with preview
- Featured articles section
- Read time indicator
- Author bio
- Article detail page
- Comments section (Planned)
- Related articles
- Share article
- Save article (Planned)
- Like/upvote article (Planned)

**Categories:**
- College Selection Guide
- Career Planning
- Exam Preparation
- Life on Campus
- Success Stories

**Data Points (Article Card - List View):**
- id: string
- title: string
- slug: string
- excerpt: string (summary)
- category: string
- author.name: string
- author.avatar: URL
- featured: boolean
- viewCount: number
- likeCount: number (Planned)
- readTime: number (minutes)
- publishedAt: timestamp
- updatedAt: timestamp
- imageUrl: URL
- tags: string[]

**Data Points (Article Detail):**
- id: string
- title: string
- slug: string
- content: string (full HTML/markdown)
- category: string
- author.name: string
- author.bio: string
- author.avatar: URL
- author.socialLinks: object (Planned)
- imageUrl: URL (hero image)
- viewCount: number
- likeCount: number (Planned)
- shareCount: number
- publishedAt: timestamp
- updatedAt: timestamp
- readTime: number
- tags: string[]
- relatedArticles: Article[] (3-5 related)
- comments: Comment[] (Planned)

**Data Points (Comment - Planned):**
- id: string
- content: string
- author.name: string
- author.avatar: URL
- publishedAt: timestamp
- replies: Comment[] (nested)
- likeCount: number

**UI Components:**
- Articles grid/list view
- Article search
- Category filter
- Sort dropdown
- Article card
- Featured article banner
- Article detail page
- Content with images
- Author card
- Comments section (Planned)
- Related articles section

---

### Page: Rankings / Collections
**Route:** `/rankings` | **Status:** 📅 Planned

**Objective:** Curated college rankings by various criteria

**Features:**
- Ranking type selector (tabs or dropdown)
- Sortable ranking table
- Rank number with medal (gold/silver/bronze for top 3)
- College card in ranking
- Filter results
- College comparison from rankings
- View college details
- Share ranking link
- Trending rankings (Planned)

**Ranking Types:**
- Top colleges by placement rate
- Best colleges by fees (budget-friendly)
- Best colleges by location
- Top colleges by overall rating
- Community favorites (most saved)
- Hidden gems (highly rated, less known)
- Best for engineering
- Best for commerce
- Best for arts (Planned)

**Data Points (Ranking Entry):**
- rank: number
- collegeId: string
- collegeName: string
- location: string
- type: string
- rating: number
- placementRate: number
- avgSalary: number
- fees: number
- badge: string (Top Performer, Best Value, etc.)
- trend: string (Up/Down/Stable)
- trendChange: number (%)
- score: number (composite score)
- highlights: string[] (key facts)

**Data Points (Ranking Metadata):**
- rankingType: string
- title: string
- description: string
- generatedAt: timestamp
- validUntil: timestamp
- totalColleges: number
- basedOn: string[] (criteria used)

**UI Components:**
- Ranking type tabs
- Ranking table
- College entry row
- Rank badge
- Trend indicator
- Filter controls
- Column sort toggles
- Compare selected button
- View details button

---

### Page: User Dashboard
**Route:** `/dashboard` | **Status:** 📅 Planned

**Objective:** Personalized user home with activities and recommendations

**Features:**
- Welcome greeting
- Statistics cards (colleges saved, questions asked, etc.)
- Quick action buttons
- Recent activity feed
- Recommended colleges (based on browsing)
- Trending colleges (Planned)
- Saved colleges carousel
- Saved questions carousel
- Activity timeline (Planned)
- Notifications center (Planned)
- Quick navigation cards

**Statistics to Display:**
- Total colleges saved
- Total questions asked
- Total answers provided
- Profile completion percentage
- Notifications count

**Quick Actions:**
- Browse colleges
- Ask question
- View saved colleges
- View saved questions
- Update profile

**Data Points (Dashboard Data):**
- userId: string
- userName: string
- userAvatar: URL
- profileComplete: number (%)
- stats: {
    - collegesSaved: number
    - questionsAsked: number
    - answersProvided: number
  }
- recentActivity: Activity[]
- recommendedColleges: College[] (5-10)
- savedColleges: College[] (preview)
- savedQuestions: Question[] (preview)
- notifications: Notification[] (5 latest)

**Data Points (Activity Item):**
- id: string
- type: string (saved_college, asked_question, answered_question)
- timestamp: datetime
- description: string
- actionUrl: URL
- icon: icon component

**UI Components:**
- Greeting section
- Statistics cards
- Quick actions buttons
- Recent activity feed
- Recommended colleges carousel
- Saved colleges preview
- Notifications center
- Action cards

---

### Page: User Profile
**Route:** `/profile` | **Status:** 📅 Planned

**Objective:** Manage user account and personal information

**Features:**
- Profile picture upload
- Name & email edit
- Password change form
- Notification preferences
- Privacy settings (Planned)
- Activity history
- Delete account option
- Two-factor authentication (Planned)
- Social account linking (Planned)
- Download user data (GDPR)

**Data Points (Profile Section):**
- userId: string
- avatar: URL
- name: string
- email: string
- createdAt: timestamp
- updatedAt: timestamp
- lastLogin: timestamp

**Data Points (Settings):**
- emailNotifications: boolean
- smsNotifications: boolean
- pushNotifications: boolean
- marketingEmails: boolean
- profileVisibility: string (public/private)
- twoFactorEnabled: boolean (Planned)
- linkedAccounts: object (Planned)

**Data Points (Activity History):**
- activityItems: array of {
    - date: timestamp
    - action: string
    - description: string
  }

**UI Components:**
- Profile picture uploader
- Name input
- Email display
- Password change form
- Notification toggles
- Privacy selectors
- Activity timeline
- Delete account button
- Download data button

---

### Page: Saved Questions / Bookmarks
**Route:** `/saved/questions` | **Status:** 📅 Planned

**Objective:** Manage bookmarked helpful Q&A threads

**Features:**
- Saved questions list
- Search saved questions
- Filter by college
- Sort options
- Remove from saved
- View question details
- View answer count
- View saved date
- Open in new tab
- Quick collections (Planned)

**Data Points (Saved Question Card):**
- id: string
- questionId: string
- title: string
- content: string (snippet)
- collegeName: string
- answerCount: number
- savedAt: timestamp
- viewCount: number
- tags: string[]

**UI Components:**
- Question list
- Question card
- Search input
- Filter panel
- Remove button
- View details button

---

### Page: About Page
**Route:** `/about` | **Status:** ✅ Implemented

**Objective:** Inform users about platform, mission, and team

**Features:**
- Mission statement
- Team introduction
- Company history (Planned)
- Features overview
- Contact information
- Social media links
- FAQ section
- Press kit (Planned)
- Blog link

**Data Points (Static Content):**
- missionStatement: string
- visionStatement: string
- teamMembers: array of {name, role, avatar, bio}
- contactEmail: string
- contactPhone: string
- socialLinks: {twitter, linkedin, facebook, instagram}
- faqItems: array of {question, answer}

**UI Components:**
- Hero section
- Mission section
- Team cards grid
- Features grid
- Contact section
- FAQ accordion
- Footer with links

---

### Page: Terms & Conditions
**Route:** `/terms` | **Status:** 📅 Planned

**Objective:** Legal document outlining platform usage rules

**Features:**
- Scrollable content
- Section navigation (table of contents)
- Print friendly
- Versioning & update date
- Accept checkbox (on registration)

**Data Points:**
- version: string
- lastUpdated: timestamp
- content: string (HTML/markdown)
- sections: string[] (table of contents)

**UI Components:**
- Content sections
- Sticky navigation
- Print button

---

### Page: Privacy Policy
**Route:** `/privacy` | **Status:** 📅 Planned

**Objective:** Explain how user data is collected and protected

**Features:**
- Scrollable policy content
- Section navigation
- Print friendly
- Versioning
- Accordion sections (Planned)

**Data Points:**
- version: string
- lastUpdated: timestamp
- content: string (HTML/markdown)
- sections: string[]

**UI Components:**
- Content sections
- Sticky navigation
- Print button

---

### Page: Help & FAQ
**Route:** `/help` | **Status:** 📅 Planned

**Objective:** Provide support and answer common questions

**Features:**
- Search help articles
- FAQ accordion
- Category tabs
- Contact support button
- Video tutorials (Planned)
- Chatbot support (Planned)
- Feedback form (Planned)

**Categories:**
- Getting Started
- College Search
- Comparisons
- Q&A Community
- Account & Settings
- Technical Issues

**Data Points (FAQ Item):**
- id: string
- question: string
- answer: string (HTML/markdown)
- category: string
- views: number
- helpful: number (upvotes)
- notHelpful: number (downvotes)
- relatedTopics: string[]

**Data Points (Help Article):**
- id: string
- title: string
- content: string
- category: string
- tags: string[]
- videoUrl: URL (Planned)
- readTime: number

**UI Components:**
- Search input
- Category tabs
- FAQ accordion
- Article list
- Contact support button
- Video embed (Planned)

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

## 8. Data Model & Database Schema

### 8.1 Entity Relationship Diagram

```
┌─────────────────┐
│      User       │
│─────────────────│
│ id (PK)         │
│ email (UNIQUE)  │
│ name            │
│ password        │
│ createdAt       │
│ updatedAt       │
└────────┬────────┘
         │
         ├─────────────────┬──────────────────┬──────────────────┐
         │                 │                  │                  │
    (1:N)│(1:N)        (1:N)│(1:N)         (1:N)│(1:N)         (1:N)│(1:N)
         │                 │                  │                  │
         ↓                 ↓                  ↓                  ↓
  ┌─────────────┐   ┌──────────────┐  ┌────────────┐   ┌────────────────┐
  │SavedCollege │   │  Question    │  │  Answer    │   │    Review      │
  │─────────────│   │──────────────│  │────────────│   │────────────────│
  │ id (PK)     │   │ id (PK)      │  │ id (PK)    │   │ id (PK)        │
  │ userId (FK) │   │ userId (FK)  │  │ userId(FK) │   │ userId (FK)    │
  │ collegeId   │   │ collegeId(FK)│  │ questionId │   │ collegeId (FK) │
  │ createdAt   │   │ content      │  │ (FK)       │   │ rating         │
  │ notes       │   │ tags         │  │ content    │   │ reviewText     │
  │ tags        │   │ createdAt    │  │ upvotes    │   │ helpful        │
  │             │   │ viewCount    │  │ downvotes  │   │ createdAt      │
  │             │   │ answerCount  │  │ createdAt  │   │                │
  └──────┬──────┘   └──────┬───────┘  └──────┬─────┘   └────────┬───────┘
         │                 │                 │                  │
         │                 ├────────────────┐│                  │
         │                 │                ││                  │
         └─────────────────┼────────────────┼┼──────────────────┘
                           │                ││
                           │ (1:N)      (1:N)││ (1:N)
                           │                ││
                           ↓                ↓↓
                      ┌─────────────────────────────┐
                      │       College              │
                      │────────────────────────────│
                      │ id (PK)                    │
                      │ name                       │
                      │ location (city, state)     │
                      │ type (Gov/Private)         │
                      │ fees                       │
                      │ rating                     │
                      │ placementRate              │
                      │ avgSalary                  │
                      │ maxSalary                  │
                      │ minSalary                  │
                      │ website                    │
                      │ phone                      │
                      │ email                      │
                      │ address                    │
                      │ yearEstablished            │
                      │ totalStudents              │
                      │ facultyCount               │
                      │ companyList (JSON)         │
                      │ createdAt                  │
                      │ updatedAt                  │
                      └──────────────┬─────────────┘
                                     │
                                     ├─────────────────┬────────────────┐
                                     │                 │                │
                                 (1:N)│ (1:N)      (1:N)│(1:N)       (1:N)│(1:N)
                                     │                 │                │
                                     ↓                 ↓                ↓
                              ┌────────────┐   ┌─────────────┐  ┌──────────────┐
                              │   Course   │   │  Placement  │  │   Exam      │
                              │────────────│   │─────────────│  │──────────────│
                              │ id (PK)    │   │ id (PK)     │  │ id (PK)     │
                              │ collegeId  │   │ collegeId   │  │ collegeId   │
                              │ (FK)       │   │ (FK)        │  │ (FK)        │
                              │ name       │   │ courseId    │  │ name        │
                              │ stream     │   │ (FK)        │  │ type        │
                              │ duration   │   │ year        │  │ score       │
                              │ fees       │   │ placedCount │  │ cutoff      │
                              │ seats      │   │ avgSalary   │  │ percentile  │
                              │ maxSalary  │   │ maxSalary   │  │ createdAt   │
                              │ createdAt  │   │ topCompany  │  │             │
                              └────────────┘   │ createdAt   │  └──────────────┘
                                               └─────────────┘
```

---

### 8.2 Core Entities

#### **User**
Represents authenticated platform users

```prisma
model User {
  id            String @id @default(cuid())
  email         String @unique @db.String(255)
  name          String @db.String(255)
  password      String @db.String(255)
  avatar        String? @db.String(500)
  bio           String? @db.String(1000)
  phoneNumber   String? @db.String(20)
  location      String? @db.String(255)
  
  // Account metadata
  emailVerified DateTime?
  lastLogin     DateTime?
  loginCount    Int @default(0)
  status        String @default("active") // active, inactive, suspended
  
  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  savedColleges  SavedCollege[]
  questions      Question[]
  answers        Answer[]
  reviews        Review[]
  predictor      PredictionResult[]
  finder         FinderResult[]
  
  // Indexes
  @@index([email])
  @@index([createdAt])
}
```

**Key Fields:**
- `id`: Unique identifier (CUID)
- `email`: Unique email for login (indexed)
- `password`: Hashed with bcrypt
- `emailVerified`: For email verification flow (Planned)
- `loginCount`, `lastLogin`: Engagement metrics
- `status`: Account status (active/inactive/suspended)

---

#### **College**
Core college/institution entity

```prisma
model College {
  id                String @id @default(cuid())
  name              String @unique @db.String(255)
  location          String @db.String(255) // "city, state"
  city              String @db.String(100)
  state             String @db.String(100)
  
  // Classification
  type              String @db.String(50) // "Government" or "Private"
  established       Int?
  website           String? @db.String(500)
  
  // Contact
  phone             String? @db.String(20)
  email             String? @db.String(255)
  address           String? @db.String(500)
  latitude          Float?
  longitude         Float?
  
  // Financial
  fees              Float? // total fees
  feesPerSemester   Float?
  hostelFees        Float?
  
  // Academic Stats
  totalStudents     Int?
  facultyCount      Int?
  studentTeacherRatio Float?
  
  // Placement & Career
  placementRate     Float? // percentage (0-100)
  avgSalary         Float?
  maxSalary         Float?
  minSalary         Float?
  medianSalary      Float?
  salaryGrowth      Float? // YoY percentage
  placedStudents    Int?
  topRecruiter      String?
  companyList       String @default("[]") // JSON array
  industries        String @default("[]") // JSON array
  
  // Ratings & Reviews
  rating            Float @default(0) // 0-5
  reviewCount       Int @default(0)
  ratingCount       Int @default(0)
  
  // Metadata
  savedCount        Int @default(0) // denormalized count
  viewCount         Int @default(0)
  searchRank        Int? // for ranking pages
  isFeatured        Boolean @default(false)
  
  // Timestamps
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  savedBy           SavedCollege[]
  questions         Question[]
  answers           Answer[]
  reviews           Review[]
  courses           Course[]
  placements        Placement[]
  exams             Exam[]
  
  // Indexes
  @@unique([name])
  @@index([location])
  @@index([type])
  @@index([city])
  @@index([state])
  @@index([rating])
  @@index([placementRate])
  @@index([createdAt])
  @@fulltext([name, city, state]) // for search
}
```

**Key Fields:**
- `id`: Unique identifier
- `name`: Unique college name (indexed for search)
- `type`: Government/Private (indexed for filtering)
- `fees`: Total fees (used for filtering)
- `placementRate`: Placement percentage (indexed for sorting)
- `rating`: Average rating (0-5, indexed)
- `savedCount`: Denormalized count for fast query
- `companyList`, `industries`: JSON arrays for recruitment data

---

#### **SavedCollege**
User's bookmarked/shortlisted colleges

```prisma
model SavedCollege {
  id        String @id @default(cuid())
  userId    String
  collegeId String
  
  // Optional metadata
  notes     String? @db.String(1000)
  tags      String @default("[]") // JSON array
  priority  Int @default(0) // 0=low, 1=medium, 2=high
  status    String @default("interested") // interested, shortlisted, rejected, accepted
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
  college   College @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  
  // Constraints
  @@unique([userId, collegeId]) // prevent duplicates
  @@index([userId])
  @@index([collegeId])
  @@index([createdAt])
  @@index([status])
}
```

**Key Fields:**
- `userId, collegeId`: Foreign keys (unique constraint prevents duplicates)
- `notes`: User notes about college
- `tags`: User-defined tags (JSON)
- `status`: Tracking through decision journey
- `priority`: Help with ranking saved colleges

---

#### **Question**
User-generated Q&A posts

```prisma
model Question {
  id        String @id @default(cuid())
  title     String @db.String(255)
  content   String @db.Text
  userId    String
  collegeId String
  
  // Metadata
  tags      String @default("[]") // JSON array
  category  String? @db.String(100) // "admission", "course", "placement", etc.
  
  // Engagement
  viewCount Int @default(0)
  upvotes   Int @default(0)
  downvotes Int @default(0)
  
  // Answer tracking
  answerCount Int @default(0) // denormalized
  hasAcceptedAnswer Boolean @default(false)
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  lastActivityAt DateTime @default(now()) // for "trending" sorting
  
  // Relations
  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
  college   College @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  answers   Answer[]
  
  // Indexes
  @@index([userId])
  @@index([collegeId])
  @@index([createdAt])
  @@index([lastActivityAt])
  @@index([answerCount])
  @@fulltext([title, content]) // for search
}
```

**Key Fields:**
- `title`: Question title (full-text indexed)
- `content`: Question description
- `tags`: Categorization (JSON)
- `viewCount`, `upvotes`: Engagement metrics
- `answerCount`: Denormalized for sorting
- `lastActivityAt`: For "trending" vs "newest" sorting

---

#### **Answer**
Responses to questions

```prisma
model Answer {
  id         String @id @default(cuid())
  content    String @db.Text
  userId     String
  questionId String
  
  // Engagement
  upvotes    Int @default(0)
  downvotes  Int @default(0)
  
  // Acceptance
  isAccepted Boolean @default(false)
  
  // Media (Planned)
  attachments String @default("[]") // JSON array of URLs
  
  // Timestamps
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  // Relations
  user       User @relation(fields: [userId], references: [id], onDelete: Cascade)
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  
  // Indexes
  @@index([userId])
  @@index([questionId])
  @@index([createdAt])
}
```

**Key Fields:**
- `questionId`: Foreign key to question
- `isAccepted`: Marks best answer
- `upvotes`, `downvotes`: Community voting

---

#### **Review**
User reviews for colleges

```prisma
model Review {
  id        String @id @default(cuid())
  userId    String
  collegeId String
  
  // Rating & Content
  rating    Int // 1-5 stars
  title     String @db.String(255)
  content   String @db.Text
  
  // Categorized ratings (Planned)
  academicsRating Float?
  placementsRating Float?
  facilitiesRating Float?
  campusLifeRating Float?
  valueForMoneyRating Float?
  
  // Student Info (Planned)
  studentStream String? // Engineering, Commerce, etc.
  graduationYear Int?
  
  // Engagement
  helpful   Int @default(0)
  notHelpful Int @default(0)
  
  // Moderation (Planned)
  status    String @default("approved") // approved, pending, rejected
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
  college   College @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  
  // Indexes
  @@index([userId])
  @@index([collegeId])
  @@index([rating])
  @@index([createdAt])
}
```

**Key Fields:**
- `rating`: 1-5 star rating
- `academicsRating`, `placementsRating`, etc.: Detailed ratings
- `helpful`, `notHelpful`: Review usefulness tracking

---

#### **Course**
Academic programs offered by colleges

```prisma
model Course {
  id        String @id @default(cuid())
  collegeId String
  
  // Basic Info
  name      String @db.String(255)
  stream    String @db.String(100) // Engineering, Commerce, Arts, etc.
  specialization String? @db.String(255) // CSE, ECE, Mechanical, etc.
  
  // Duration & Capacity
  duration  String @db.String(50) // "2 years", "4 years"
  durationMonths Int? // for sorting
  totalSeats Int?
  enrolledSeats Int?
  
  // Financial
  totalFees Float?
  annualFees Float?
  semesterFees Float?
  
  // Placement Data
  placementRate Float?
  avgSalary Float?
  maxSalary Float?
  minSalary Float?
  topRecruiter String?
  
  // Eligibility (Planned)
  eligibility String? @db.Text
  prerequisiteCourses String? @default("[]") // JSON
  
  // Additional Info
  accreditations String? @default("[]") // JSON
  specializations String? @default("[]") // JSON
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  college   College @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  placements Placement[]
  exams     Exam[]
  
  // Indexes
  @@index([collegeId])
  @@index([stream])
  @@index([specialization])
  @@index([placementRate])
}
```

**Key Fields:**
- `collegeId`: Foreign key
- `stream`: Engineering, Commerce, Arts
- `durationMonths`: For sorting/filtering
- `totalSeats`, `enrolledSeats`: Capacity tracking
- `placementRate`, `avgSalary`: Per-course metrics

---

#### **Placement**
Historical placement data by year/course

```prisma
model Placement {
  id        String @id @default(cuid())
  collegeId String
  courseId  String?
  
  // Placement Details
  year      Int // academic year
  placedCount Int
  totalStudents Int
  placementRate Float // calculated percentage
  
  // Salary Info
  avgSalary Float?
  medianSalary Float?
  maxSalary Float?
  minSalary Float?
  salaryRange String? // "10-50 LPA"
  
  // Recruitment
  companiesRecruited Int?
  topRecruiters String? @default("[]") // JSON array
  industries String? @default("[]") // JSON array
  rolesOffered String? @default("[]") // JSON array
  
  // Additional Stats
  internshipRate Float?
  higherStudies Int? // students pursuing further studies
  entrepreneurship Int? // students starting ventures
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  college   College @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  course    Course? @relation(fields: [courseId], references: [id], onDelete: SetNull)
  
  // Indexes
  @@index([collegeId])
  @@index([year])
  @@index([courseId])
  @@unique([collegeId, courseId, year]) // prevent duplicates
}
```

**Key Fields:**
- `year`: Academic year for trend analysis
- `placedCount`, `totalStudents`: For rate calculation
- `avgSalary`, `medianSalary`, `maxSalary`: Salary metrics
- `companiesRecruited`, `topRecruiters`: Recruitment data

---

#### **Exam**
Entrance exams associated with colleges

```prisma
model Exam {
  id        String @id @default(cuid())
  collegeId String
  courseId  String?
  
  // Exam Info
  name      String @db.String(255) // JEE Main, NEET, etc.
  type      String @db.String(100)
  year      Int // admission year
  
  // Cutoff Info
  cutoffScore Float?
  cutoffPercentile Float?
  cutoffRank Int?
  category  String? // General, OBC, SC, ST, etc.
  
  // Additional Info
  totalApplicants Int?
  selectedCandidates Int?
  totalSeats Int?
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  college   College @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  course    Course? @relation(fields: [courseId], references: [id], onDelete: SetNull)
  
  // Indexes
  @@index([collegeId])
  @@index([year])
  @@index([courseId])
  @@index([name])
}
```

**Key Fields:**
- `name`: JEE/NEET/Board exam type
- `cutoffScore`, `cutoffPercentile`, `cutoffRank`: Admission thresholds
- `year`: For historical tracking
- `category`: Reserved category information

---

### 8.3 Future Entities (Planned)

#### **PredictionResult** (Planned)
Stores user predictions from the predictor tool

```prisma
model PredictionResult {
  id        String @id @default(cuid())
  userId    String?
  
  // Input Data
  examType  String // JEE, NEET, Board
  score     Float
  rank      Int?
  percentile Float?
  stream    String
  
  // Preferences
  preferredLocations String @default("[]") // JSON
  budgetMin Float?
  budgetMax Float?
  
  // Results
  predictions String @db.Text // JSON array of {collegeId, chance, category}
  savedForLater Boolean @default(false)
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  user      User? @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  // Indexes
  @@index([userId])
  @@index([createdAt])
}
```

---

#### **FinderResult** (Planned)
Results from the college finder questionnaire

```prisma
model FinderResult {
  id        String @id @default(cuid())
  userId    String?
  
  // Questionnaire Responses
  budgetMin Float?
  budgetMax Float?
  locations String @default("[]") // JSON
  stream    String?
  maxDistance Float?
  
  // Weighted Scores
  responses String @db.Text // JSON of all responses
  
  // Results
  recommendations String @db.Text // JSON array of recommended colleges
  savedForLater Boolean @default(false)
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  user      User? @relation(fields: [userId], references: [id], onDelete: SetNull)
  
  // Indexes
  @@index([userId])
  @@index([createdAt])
}
```

---

#### **Article** (Planned)
Blog/educational content

```prisma
model Article {
  id        String @id @default(cuid())
  
  // Content
  title     String @db.String(255)
  slug      String @unique @db.String(255)
  excerpt   String @db.String(500)
  content   String @db.Text
  
  // Metadata
  category  String @db.String(100)
  tags      String @default("[]") // JSON
  readTime  Int? // minutes
  
  // Author (Planned)
  authorId  String?
  author    String @db.String(255) // fallback name
  
  // Media
  imageUrl  String? @db.String(500)
  
  // Engagement
  viewCount Int @default(0)
  likeCount Int @default(0)
  shareCount Int @default(0)
  
  // Status
  published Boolean @default(false)
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  publishedAt DateTime?
  
  // Indexes
  @@unique([slug])
  @@index([category])
  @@index([published])
  @@index([publishedAt])
}
```

---

### 8.4 Relationships Summary

| From | To | Type | Cascade |
|------|-----|------|---------|
| User | SavedCollege | 1:N | Delete user → delete saves |
| User | Question | 1:N | Delete user → delete questions |
| User | Answer | 1:N | Delete user → delete answers |
| User | Review | 1:N | Delete user → delete reviews |
| College | SavedCollege | 1:N | Delete college → delete saves |
| College | Question | 1:N | Delete college → delete questions |
| College | Course | 1:N | Delete college → delete courses |
| College | Placement | 1:N | Delete college → delete placements |
| College | Exam | 1:N | Delete college → delete exams |
| Question | Answer | 1:N | Delete question → delete answers |
| Course | Placement | 1:N | Delete course → set placement.courseId = null |
| Course | Exam | 1:N | Delete course → set exam.courseId = null |

---

### 8.5 Database Indexes Strategy

**High-Priority Indexes (Query Performance):**
- `College.name` - Full-text search
- `College.location, City, State` - Filtering
- `College.type` - Filtering
- `College.rating, placementRate, fees` - Sorting
- `Question.collegeId, userId` - FK lookups
- `SavedCollege.userId` - User's saved list
- `Answer.questionId` - Threading answers
- `Placement.collegeId, year` - Historical data

**Full-Text Search Indexes:**
- `College(name, city, state)` - College discovery
- `Question(title, content)` - Q&A search
- `Course(name, specialization)` - Course search

**Unique Constraints:**
- `User.email` - Login uniqueness
- `College.name` - No duplicate colleges
- `SavedCollege(userId, collegeId)` - Prevent duplicate saves
- `Placement(collegeId, courseId, year)` - No duplicate years
- `Article.slug` - URL uniqueness

---

### 8.6 Indexing Examples

```prisma
// Composite indexes for common queries
@@index([collegeId, createdAt]) // get recent questions about college
@@index([userId, status]) // get user's saves by status
@@index([year, placementRate]) // get top colleges by year

// Full-text search
@@fulltext([name, city, state]) // college search
@@fulltext([title, content]) // question search

// Unique constraints
@@unique([userId, collegeId]) // prevent duplicate saves
@@unique([collegeId, courseId, year]) // prevent duplicate placement years
```

---

### 8.7 Query Optimization Patterns

**Common Queries & Recommended Indexes:**

1. **Get colleges with filters**
   ```sql
   SELECT * FROM College 
   WHERE location LIKE ? AND type = ? AND fees <= ?
   ORDER BY rating DESC
   INDEX: (type, location, fees, rating)
   ```

2. **Get user's saved colleges**
   ```sql
   SELECT c.* FROM College c
   JOIN SavedCollege s ON c.id = s.collegeId
   WHERE s.userId = ?
   INDEX: SavedCollege(userId, collegeId), College(id)
   ```

3. **Get questions for a college**
   ```sql
   SELECT * FROM Question
   WHERE collegeId = ?
   ORDER BY lastActivityAt DESC
   INDEX: (collegeId, lastActivityAt)
   ```

4. **Search questions by keyword**
   ```sql
   SELECT * FROM Question
   WHERE MATCH(title, content) AGAINST(?)
   INDEX: FULLTEXT(title, content)
   ```

5. **Get placement trends**
   ```sql
   SELECT * FROM Placement
   WHERE collegeId = ?
   ORDER BY year DESC
   INDEX: (collegeId, year)
   ```

---

### 8.8 Data Validation Rules

**College Entity:**
- `name`: Required, unique, 1-255 chars
- `location`: Required, format "City, State"
- `type`: Enum (Government, Private)
- `fees`: Float, >= 0
- `rating`: Float, 0-5
- `placementRate`: Float, 0-100 (percentage)

**User Entity:**
- `email`: Required, unique, valid email format
- `password`: Required, min 6 chars, hashed
- `name`: Required, 2-255 chars
- `status`: Enum (active, inactive, suspended)

**Question Entity:**
- `title`: Required, 10-255 chars
- `content`: Required, min 20 chars
- `collegeId`: Required, valid Foreign Key
- `userId`: Required, valid Foreign Key

**SavedCollege Entity:**
- Unique constraint on (userId, collegeId)
- `status`: Enum (interested, shortlisted, rejected, accepted)
- `priority`: Enum (0, 1, 2)

**Review Entity:**
- `rating`: Required, 1-5
- `title`: Required, 1-255 chars
- `content`: Required, min 20 chars
- `academicsRating`, etc.: Optional, 1-5 if present

---

### 8.9 Denormalization Strategy

**Calculated/Cached Fields (Update via Triggers/Jobs):**

| Field | Table | Purpose | Update Frequency |
|-------|-------|---------|-------------------|
| `savedCount` | College | Quick lookup of popularity | After each save/unsave |
| `reviewCount` | College | Display on cards | After each review |
| `ratingCount` | College | For average calculation | After each review |
| `answerCount` | Question | Sort by answered/unanswered | After each answer |
| `placedCount` | Placement | For percentage calc | Manual update |
| `enrolledSeats` | Course | Track capacity | Manual update |

**Why Denormalization:**
- Fast aggregation queries (no COUNT needed)
- Better performance for common queries
- Real-time display updates

---

## 9. Data Flow Architecture

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

**Document maintained by:** Angela Bera  
**Last Updated:** May 5, 2026  
**Questions?** Refer to individual route implementations or backend API docs

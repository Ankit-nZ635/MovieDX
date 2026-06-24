# 🎬 MovieDX - Movie Discovery Platform

![MovieDX Banner](https://img.shields.io/badge/MovieDX-Movie%20Discovery%20Platform-orange?style=for-the-badge&logo=film)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

> A full-stack MERN movie discovery platform — browse movies, watch trailers, find where to stream, and track upcoming releases all in one place.

---

## 🌐 Live Demo
🔗 **Coming Soon** — Deploying on Vercel + Render

---

## ✨ Features

### 👤 User Features
- 🔐 Secure authentication (Register/Login with JWT)
- 🎬 Browse 50+ movies with real posters & IMDb ratings
- 🔍 Search movies by title
- 🎭 Filter by genre (Action, Drama, Sci-Fi, Crime...)
- ⭐ Filter by IMDb rating
- ▶️ Watch official trailers (YouTube)
- 📺 See where to stream (Netflix, Prime Video, Hotstar)
- 📅 Upcoming movies section with release dates
- ❤️ Add movies to personal watchlist

### 🔧 Admin Features
- ➕ Add new movies to the platform
- 🗑️ Remove movies
- 📊 Manage genres
- 🖼️ Upload custom movie images via Cloudinary

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
|-----------|-------|
| React.js | UI Framework |
| Redux | State Management |
| CSS3 | Styling |
| Axios | API Calls |

### Backend
| Technology | Usage |
|-----------|-------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Nodemailer | Email Service |
| Cloudinary | Image Upload |
| Multer | File Handling |

### External APIs
| API | Usage |
|-----|-------|
| OMDb API | Movie data, posters, ratings |
| YouTube | Trailer links |

---

## 📁 Project Structure

MvieDX/

├── controller/          # API route handlers

│   ├── auth.js          # Authentication routes

│   ├── movie.js         # Movie CRUD routes

│   ├── genre.js         # Genre routes

│   └── user.js          # User routes

├── middleware/          # Custom middleware

│   ├── checkAuth.js     # JWT verification

│   └── checkAdmin.js    # Admin role check

├── models/              # MongoDB schemas

│   ├── movie.js         # Movie model

│   ├── genre.js         # Genre model

│   └── user.js          # User model

├── utils/               # Utility functions

│   ├── mongodb.js       # DB connection

│   ├── cloudinary.js    # Image upload

│   └── nodemailer.js    # Email service

├── frontend/            # React application

│   └── src/

│       ├── actions/     # Redux actions

│       ├── components/  # Reusable components

│       ├── pages/       # Page components

│       └── reducers/    # Redux reducers

├── seed.js              # Database seeder

├── server.js            # Entry point

└── .env                 # Environment variables

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v16+
- MongoDB Atlas account
- OMDb API key (free at omdbapi.com)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Ankit-nZ635/MovieDX.git
cd MovieDX/iCinema
```

### 2️⃣ Install dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3️⃣ Configure environment variables
Create a `.env` file in the root directory:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/iCinema
JWT_SECRET=your_jwt_secret_key
PORT=5000
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4️⃣ Seed the database
```bash
node seed.js
```

### 5️⃣ Run the application
```bash
npm run dev
```

Open **http://localhost:3000** in your browser 🚀

---

## 🔑 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signUp` | Register new user |
| POST | `/api/auth/signIn` | Login user |

### Movie Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies/:id` | Get single movie |
| POST | `/api/movies/addMovie` | Add movie (Admin) |
| PATCH | `/api/movies/:id` | Update movie (Admin) |

### Genre Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/genres` | Get all genres |
| POST | `/api/genres` | Add genre (Admin) |

---

## 🚀 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Images | Cloudinary |

---

## 📸 Screenshots

### 🏠 Home Page
![Home](public/screenshots/home.png)
 
### 📺 Where to Watch
![Movie Card](public/screenshots/movie-card.png)

### 🔐 Login Page
![Login](public/screenshots/login.png)

---

## 🔮 Future Improvements
- [ ] Movie recommendations based on genre
- [ ] User reviews & ratings
- [ ] Email notifications for upcoming movies
- [ ] Mobile app (React Native)
- [ ] Social login (Google, GitHub)

---

## 👤 Author

**Ankit Ekka**
- GitHub: [@Ankit-nZ635](https://github.com/Ankit-nZ635)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

⭐ **If you find this project useful, please give it a star!** ⭐

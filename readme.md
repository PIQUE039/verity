# Verity

A full-stack classified ads marketplace where users can post, browse, search, and save secondhand listings.

**Live Demo:** [olx-clone-teal.vercel.app](https://olx-clone-teal.vercel.app)

---

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas, Mongoose  
**Auth:** JWT (JSON Web Tokens), bcryptjs  
**Image Storage:** Cloudinary  
**Deployment:** Vercel (frontend), Render (backend)

---

## Features

- User registration and login with hashed passwords and JWT auth
- Post a listing with image upload (stored on Cloudinary)
- Browse all listings with real-time search and category filtering
- View listing detail page with seller info
- Save/unsave listings (wishlist) with instant toggle
- My Ads page — view and delete your own listings
- Ownership-verified delete — only the seller can delete their listing
- Protected routes — unauthenticated users are redirected to login

---

## Architecture Decisions

**Stateless server with Cloudinary**  
Images are stored on Cloudinary, not the server filesystem. Render's free tier has an ephemeral filesystem — local files are wiped on every restart. Offloading image storage to Cloudinary keeps the backend stateless and deployment-safe.

**JWT over sessions**  
Authentication uses JWT instead of server-side sessions. JWTs are self-contained — the server verifies the signature and reads the user ID from the token payload without storing any session state. Scales horizontally without a shared session store.

**Express route ordering**  
Static routes (`/listings/my`, `/listings/saved`) are registered before dynamic routes (`/listings/:id`). Express matches top to bottom — registering `/:id` first would cause Express to treat the string "my" as a MongoDB ObjectId, fail the cast, and throw a 500.

**Ownership check on delete (401 vs 403)**  
A valid JWT proves authentication, not ownership. The delete controller compares `listing.seller` (stored in MongoDB) against `req.user` (decoded from the token). A mismatch returns 403 — not 401 — because the user is authenticated but not authorized for this specific resource.

---

## Running Locally

**Prerequisites:** Node.js, MongoDB (local or Atlas), Cloudinary account

```bash
# Clone the repo
git clone https://github.com/PIQUE039/olx-clone.git
cd olx-clone

# Backend
cd backend
cp .env.example .env   # fill in your values
npm install
npm run dev

# Frontend
cd ../frontend
cp .env.example .env   # fill in your values
npm install
npm run dev
```

**Backend `.env` variables:**
```
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PORT=5000
```

**Frontend `.env` variables:**
```
VITE_API_URL=http://localhost:5000
```

---

## API Routes

### Auth
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login, returns JWT |

### Listings
| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/listings` | Public | Get all listings (supports `?search=` and `?category=`) |
| POST | `/api/listings` | Protected | Create a new listing |
| GET | `/api/listings/my` | Protected | Get current user's listings |
| GET | `/api/listings/saved` | Protected | Get current user's saved listings |
| GET | `/api/listings/:id` | Public | Get a single listing |
| DELETE | `/api/listings/:id` | Protected | Delete a listing (ownership verified) |
| PATCH | `/api/listings/:id/save` | Protected | Toggle save/unsave a listing |

---

## Project Structure

```
olx-clone/
├── backend/
│   ├── config/
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── listingController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Listing.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── listingRoutes.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── ListingCard.jsx
        │   └── ProtectedRoute.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── AddListing.jsx
        │   ├── ProductDetails.jsx
        │   ├── MyListings.jsx
        │   └── SavedListings.jsx
        └── api.js
```

---

## Known Limitations

- Render free tier cold starts (~30s after inactivity)
- No real-time chat (planned — Socket.io deferred post-launch)
- Saved listings sync assumes single device (context rehydrated from localStorage on login)

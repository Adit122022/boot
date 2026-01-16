# 🧠 Omoide (思い出): Means "Recollection" or "Memories." 

A full-stack "Omoide (思い出)" application designed to help you capture, organize, and retrieve your digital content (tweets, videos, articles, links). Built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- **Authentication**: Secure Signup and Login with JWT.
- **Content Management**:
  - Add various content types: Twitter, YouTube, Documents, and generic Links.
  - Delete content.
  - **Drag & Drop**: Organize your content cards by dragging them around the dashboard.
  - **Filtering**: Filter content by type via the sidebar.
- **Responsive UI**:
  - Mobile-friendly Sidebar with hamburger menu.
  - Responsive grid layout for content cards.
- **Sharing**: "Share Brain" feature to generate a public link (functionality backend-ready).
- **User Profile**: Display username and email in the sidebar.

## 🛠️ Tech Stack

### Frontend (`/client`)

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations/Interactions**: Framer Motion (for drag & drop)
- **State Management**: React Context (AuthContext)
- **Routing**: React Router DOM

### Backend (`/server`)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: BOrypt (Hashing), JWT (Tokens)
- **Language**: TypeScript

## 📂 Project Structure

```
/boot
├── client/     # React Frontend
└── server/     # Express Backend
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (Local or Atlas URI)

### 1. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` root (if not present) and configure:
   ```env
   MONGO_URI=mongodb://localhost:27017/secondbrain  # Or your Atlas URI
   JWT_SECRET=your_super_secret_key
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   Server should run on `http://localhost:3000`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Frontend should run on `http://localhost:5173` (by default).

## 🔌 API Endpoints

- **Auth**:
  - `POST /api/v1/auth/signup` - Create a new account
  - `POST /api/v1/auth/signin` - Login
- **Content**:
  - `GET /api/v1/content` - Get all user content
  - `POST /api/v1/content` - Add new content
  - `DELETE /api/v1/content` - Delete content
- **Share**:
  - `POST /api/v1/brain/share` - Toggle/Generate share link
  - `GET /api/v1/brain/:shareLink` - Access public brain

## 📝 Usage

1. **Sign Up**: Create an account on the `/signup` page.
2. **Dashboard**: Once logged in, you'll see your dashboard.
3. **Add Content**: Click "Add Content", choose a type (e.g., YouTube), and paste a link.
4. **Drag & Drop**: Click and drag cards to reorder them.
5. **Mobile**: On smaller screens, use the hamburger menu to access the sidebar.

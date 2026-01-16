# 🧠 Second Brain Backend

Welcome to the **Second Brain** backend API! This project serves as the server-side application for the Second Brain app, allowing users to store, manage, and share their useful links and content.

This guide is designed for beginners to help you understand how to interact with the API endpoints.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) for the database.

### Installation

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Configuration:**
    Ensure you have a `.env` file or your `config/_config.js` is set up with your `PORT` and MongoDB connection string.

### Running the Server

To start the server in development mode:

```bash
npm run dev
```

The server will start (defaulting to port 3000 or your configured port).
You should see: `Server is Runnning.......`

---

## 📡 API Endpoints

Base URL: `http://localhost:3000/api/v1`

### 🔐 Authentication

#### 1. Sign Up

Create a new user account.

- **Endpoint**: `/auth/signup`
- **Method**: `POST`
- **Body (JSON)**:
  ```json
  {
    "username": "User123",
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User Created 🫡✅"
  }
  ```

#### 2. Sign In

Log in to an existing account to receive your access token.

- **Endpoint**: `/auth/signin`
- **Method**: `POST`
- **Body (JSON)**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User Login",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```
  > **⚠️ Important:** Save the `token` from the response. You will need to send this token in the headers for all protected routes (Content & Sharing APIs).

---

### 🗂️ Content Management

All content endpoints require you to be logged in.
**Header Requirement:**
Add the following header to your requests:
`token: <your_jwt_token>`

#### 3. Add Content

Save a new link/content to your brain.

- **Endpoint**: `/content/`
- **Method**: `POST`
- **Header**: `token: <your_token>`
- **Body (JSON)**:
  ```json
  {
    "title": "Learn React",
    "link": "https://react.dev",
    "type": "article"
  }
  ```
  _(Note: Supported types are typically 'image', 'video', 'article', 'audio')_
- **Response**:
  ```json
  {
    "message": "Content added successfully! 🚀",
    "data": { ... }
  }
  ```

#### 4. Get All Content

Retrieve all the content you have saved.

- **Endpoint**: `/content/`
- **Method**: `GET`
- **Header**: `token: <your_token>`
- **Response**:
  ```json
  {
    "message": "User contents",
    "content": [
      {
        "_id": "678e...",
        "title": "Learn React",
        "link": "https://react.dev",
        "tags": [],
        "userId": { ... }
      }
    ]
  }
  ```

#### 5. Delete Content

Remove a specific item from your brain.

- **Endpoint**: `/content/`
- **Method**: `DELETE`
- **Header**: `token: <your_token>`
- **Body (JSON)**:
  ```json
  {
    "contentId": "678e..."
  }
  ```
- **Response**:
  ```json
  {
    "message": "Deleted"
  }
  ```

---

### 🧠 Brain Sharing

#### 6. Share Your Brain

Generate a shareable link for your content.

- **Endpoint**: `/brain/share`
- **Method**: `POST`
- **Header**: `token: <your_token>`
- **Body**: _(Empty or configuration options)_
- **Response**:
  _(Retrieves the shareable link hash)_

#### 7. Access Shared Brain

View a shared brain using a link hash.

- **Endpoint**: `/brain/:shareLink`
- **Method**: `GET`
- **Params**: `shareLink` (The hash from the share endpoint)
- **Response**:
  _(Returns the shared content)_

---

## ❌ Error Handling

If something goes wrong, the API will return a JSON response with an error message:

```json
{
  "message": "Error description here",
  "status": 4xx or 5xx
}
```

Common status codes:

- `400`: Bad Request (Missing fields)
- `401`: Unauthorized (Invalid or missing token)
- `411`: Input validation error (User already exists)
- `500`: Server Error

---

Happy Hacking! 🚀

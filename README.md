
# MERN Event CRUD Application

This is a full-stack CRUD application built with the **MERN** stack, where users can log in, create, update, and delete events. The application stores user-generated data in a MongoDB database and provides a dynamic, interactive user interface.

## Features

- **Authentication**: Secure login and registration for users.
- **Event Management**: Users can create, view, update, and delete events (only when logged in).
- **Responsive UI**: The app is designed using Bootstrap for a clean and responsive user interface.
- **Database Integration**: Event data is stored in MongoDB.

## Tech Stack

- **Frontend**:
  - React
  - Vite
  - Bootstrap
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
- **Other**:
  - JWT for Authentication
  - Axios for API calls

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (for both frontend and backend)
- **MongoDB** (for the database)

### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mern-event-crud-app.git
   cd mern-event-crud-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm run dev
   ```

   The app will be running on `http://localhost:3000`.

### Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install the backend dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB:
   - If you're using MongoDB locally, ensure your MongoDB server is running.
   - Alternatively, you can use **MongoDB Atlas** and update the connection URL in the `.env` file.

4. Start the backend server:

   ```bash
   nodemon index.js
   ```

   The backend API will be running on `http://localhost:5000`.

### Environment Variables

Add your environment variables in a `.env` file in the backend directory. These variables are used for configuration:

```
MONGO_URI=mongodb://localhost:27017/eventDB
JWT_SECRET=your_jwt_secret_key
```

## How to Use

1. **User Authentication**:
   - Register a new account or log in using the provided forms on the homepage.
   - After login, the navbar will display "Hello {Username}" and show a logout button.

2. **Creating an Event**:
   - Once logged in, click the "Create Event" button to open a modal.
   - Fill in the event details and submit to create the event.

3. **Updating/Deleting Events**:
   - After creating an event, you can update or delete it by clicking the corresponding button next to each event (only visible for the logged-in user).

## Project Structure

```
/mern-event-crud-app
│
├── /backend                # Node.js and Express backend API
│   ├── /models             # MongoDB models
│   ├── /routes             # API routes
│   ├── server.js           # Main entry point for the backend
│   └── .env                # Environment variables (database URI, JWT secret, etc.)
│
├── /frontend               # React frontend
│   ├── /src
│   │   ├── /components     # React components (Navbar, Hero, EventList, etc.)
│   │   ├── App.js          # Main React component
│   │   └── index.js        # React entry point
│   └── index.html          # HTML template
│
├── package.json            # Frontend dependencies and scripts
├── backend/package.json    # Backend dependencies and scripts
└── README.md               # This file
```


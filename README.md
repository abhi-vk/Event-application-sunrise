
# MERN Event CRUD Application

This is a full-stack CRUD application built with the **MERN** stack, where users can log in, create, update, and delete events. The application stores user-generated data in a PostgreSQL database and provides a dynamic, interactive user interface.

## Features

- **Authentication**: Secure login and registration for users.
- **Event Management**: Users can create, view, update, and delete events (only when logged in).
- **Responsive UI**: The app is designed using Bootstrap for a clean and responsive user interface.
- **Database Integration**: Event data is stored in a PostgreSQL database.

## Tech Stack

- **Frontend**:
  - React
  - Vite
  - Bootstrap
- **Backend**:
  - Flask
  - PostgreSQL
- **Other**:
  - JWT for Authentication
  - Axios for API calls

## Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (for the frontend)
- **Python 3.x** (for the backend)
- **PostgreSQL** (for the database)

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

2. Create a virtual environment (optional but recommended):

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up PostgreSQL:
   - Create a new database (e.g., `event_db`) in PostgreSQL.
   - Update the `config.py` file with your database connection details.

5. Start the backend server:

   ```bash
   python app.py
   ```

   The backend API will be running on `http://localhost:5000`.

### Database Setup

The application uses PostgreSQL to store user and event data. Ensure your PostgreSQL database is properly set up and that the connection is configured in the backend.

### Environment Variables

Add your environment variables in a `.env` file in the backend directory. These variables are used for configuration:

```
DATABASE_URL=postgres://username:password@localhost:5432/event_db
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
├── /backend                # Flask backend API
│   ├── /models             # Database models
│   ├── /routes             # API routes
│   ├── app.py              # Main entry point for the backend
│   └── config.py           # Configuration settings (database, JWT, etc.)
│
├── /frontend               # React frontend
│   ├── /src
│   │   ├── /components     # React components (Navbar, Hero, EventList, etc.)
│   │   ├── App.js          # Main React component
│   │   └── index.js        # React entry point
│   └── index.html          # HTML template
│
├── package.json            # Frontend dependencies and scripts
├── requirements.txt        # Backend dependencies
└── README.md               # This file
```


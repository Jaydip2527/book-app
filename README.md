# Book App

A simple book management application built with React.js (frontend) and Node.js (backend).

## Features

- Get, Add, and delete books
- Search for books
- User authentication and authorization
- RESTful API

## Technologies

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Jaydip2527/book-app.git
    cd book-app
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    # Install frontend dependencies
    cd frontend
    npm install

    # Install backend dependencies
    cd ../server
    npm install
    ```

3. Create a `.env` file in the root of both frontend and backend directories and add the required environment variables:

    ```plaintext
    # Example .env content for frontend
    REACT_APP_API_URL=http://localhost:8000
    ```
    ```plaintext
    # Example .env content for backend
    PORT=8000
    DB_CONNECTION_URL=mongodb+srv://bookApp:book%40123@book-app.lwyiuri.mongodb.net/
    JWT_SECRET=TQfCctvKgMPPW4iw0w9bYdk4zQgHiyxsTaj6664TXtg69YAzb0TCLCftDCXgB2vg
    ```

4. Run the development server:

    ```bash
    # Start frontend
    cd frontend
    npm start

    # Start backend
    cd ../server
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

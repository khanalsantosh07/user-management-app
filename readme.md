# User Management MERN Application

## Project Overview

This is a Full Stack JavaScript User Management Application developed as part of the FSJS Final Project Fall 2024. The application demonstrates a complete CRUD (Create, Read, Update, Delete) system using the MERN stack (MongoDB, Express, React, Node.js).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Features

- User Registration
- User Authentication (Login/Logout)
- User Management (CRUD Operations)
- Responsive Web Design
- Data Grid with AG Grid
- JWT-based Authentication
- Fake Data Population

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (MongoDB Atlas or Local)

## Installation

### 1. Clone the Repository

```bash
git clone <my-repository-url>
cd user-management-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb+srv://connectsantoshkhanal:EEtlrYHj9yE6vTie@cluster0.pygq1.mongodb.net/userDatabase?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_here
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Project Structure

```
user-management-app/
│
├── backend/
│   ├── config/       # Database configuration
│   ├── controllers/  # Business logic
│   ├── models/       # Data models
│   ├── routes/       # API routes
│   ├── middleware/   # Authentication middleware
│   └── server.js/    # Express server
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── index.js/
        └── App.js/
        └── App.Test.js/
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm start
# Runs on http://localhost:5000
```

### Start Frontend React App

```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

## Authentication

### Populating Test Users

1. After starting the backend, send a POST request to:
   `http://localhost:5000/api/users/populate`
   - This creates 10 fake users
   - Default password for all users: `defaultPassword123`

### Login

- Use one of the populated user emails for example : Reuben58@yahoo.com
- Password: `defaultPassword123`
- Or register a new user through the application

## API Endpoints

### User Endpoints

- `POST /api/users/register`: Register new user
- `POST /api/users/login`: User login
- `GET /api/users/users`: Get all users
- `GET /api/users/users/:id`: Get specific user
- `PUT /api/users/users/:id`: Update user
- `DELETE /api/users/users/:id`: Delete user
- `POST /api/users/populate`: Populate database with fake users

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JSON Web Token (JWT)
  - bcrypt
  - Faker.js

- **Frontend**:
  - React
  - React Router
  - Axios
  - AG Grid
  - W3.CSS

## Author:

```
Santosh Khanal
Course: CSD-3102 Full Stack JavaScript
Date: Fall 2024
```

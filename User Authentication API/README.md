# User Authentication API

A REST API built with Node.js and Express.js that provides user registration and login with password hashing and JWT-based authentication.

## Features

- User registration and login
- Password hashing using bcryptjs
- JWT token generation
- Duplicate email validation
- Input validation and error handling
- Password verification during login

## Tech Stack

- Node.js
- Express.js
- bcryptjs
- JSON Web Token (JWT)
- dotenv
- Postman

## Setup Instructions

1. Clone or download this repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   JWT_SECRET=replace_with_a_secure_secret
   ```

4. Start the server:

   ```bash
   node server.js
   ```

5. The API runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| POST | `/auth/signup` | Register a user |
| POST | `/auth/login` | Log in and receive a JWT |

## Signup Example

`POST /auth/signup`

```json
{
  "name": "Prajwal",
  "email": "prajwal@example.com",
  "password": "SecurePass123"
}
```

## Login Example

`POST /auth/login`

```json
{
  "email": "prajwal@example.com",
  "password": "SecurePass123"
}
```

A successful login returns a JWT token and basic user information.

## Current Storage Limitation

This version stores users in an in-memory array. User records are cleared when the server restarts. Database persistence with MongoDB is a planned improvement.

## Security Notes

- Passwords are hashed before storage.
- Passwords and password hashes are not included in API responses.
- Keep `.env` out of version control.
- Use a strong, private JWT secret outside development.

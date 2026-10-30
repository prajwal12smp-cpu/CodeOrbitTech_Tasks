
# CRUD API for Contacts

A RESTful API built using Node.js, Express.js, MongoDB and Mongoose to manage contact information.

## Features

- Create a new contact
- Retrieve all contacts
- Retrieve a contact by ID
- Update an existing contact
- Delete a contact
- Required field validation
- Duplicate email prevention
- Proper HTTP status codes and error handling
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- MongoDB Community Server
- Mongoose
- JavaScript
- Postman

## Project Structure

CRUD API for Contacts/
├── controllers/
│   └── contactController.js
├── models/
│   └── Contact.js
├── routes/
│   └── contactRoutes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

## Installation

1. Clone the repository.
2. Install dependencies:

   npm install

3. Make sure MongoDB Community Server is running locally.

4. Create a `.env` file:

   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/contacts_db

5. Start the server:

   node server.js

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/contacts | Create a contact |
| GET | /api/contacts | Get all contacts |
| GET | /api/contacts/:id | Get contact by ID |
| PUT | /api/contacts/:id | Update a contact |
| DELETE | /api/contacts/:id | Delete a contact |

## Sample Request

POST /api/contacts

{
  "name": "Prajwal",
  "email": "prajwal@example.com",
  "phone": "9876543210"
}

## Testing

All five CRUD operations were tested using Postman.

## Author

Prajwal

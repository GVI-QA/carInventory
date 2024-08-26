# Car Inventory Application

## Overview

This is a full-stack car inventory application built with React (frontend) and Node.js/Express with MongoDB (backend). The application allows users to manage car records by adding, updating, and deleting cars, as well as performing bulk updates.

## Backend

### Requirements

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IronMike4/carInventory.git
   cd carInventory

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Set up MongoDB connection:**

   - Use the provided MongoDB connection string

   ```bash
   mongosh "mongodb+srv://hyperiondev123456.oeiya.mongodb.net/" --apiVersion 1 --username HyperionDev_Student1

   ```

   - Password: 3geen8FP0hJyhxEE

4. **Start the server:**

   ```bash
   node server.js

   ```

## API Endpoints

- Add a Car: POST http://localhost:5001/api/cars

  - Example Request Body:

  ```json
  {
    "make": "Mercedes-Benz",
    "model": "C200",
    "registrationNumber": "ABC1234",
    "owner": "Mike Jones",
    "year": 2018
  }
  ```

- Update a Car: PUT http://localhost:5001/api/cars/:id

  - Example Request Body:

  ```json
  {
    "make": "Toyota",
    "model": "Camry",
    "owner": "Mike Jones",
    "year": 2019
  }
  ```

- Update Multiple Cars: PUT http://localhost:5001/api/cars/bulk-patch

  - Example Request Body:

  ```json
  {
    "filter": {
      "make": "Toyota"
    },
    "update": {
      "owner": "Tom Cruise",
      "year": 2019
    }
  }
  ```

- Delete a Car: DELETE http://localhost:5001/api/cars/:id
- List All Cars: GET http://localhost:5001/api/cars
- List Cars Older Than 5 Years: GET http://localhost:5001/api/cars/older-than-5-years

## Frontend

### Requirements

- Node.js
- npm (Node Package Manager)

### Installation

1.  **Navigate to the frontend directory:**

    ```bash
    cd carInventory/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the frontend server:**
    ```bash
    npm start
    ```
    - The frontend server will run on http://localhost:3000.

## Features

- Add Car: Use the form to add a new car to the inventory.
- Update Car: Click on a car item to pre-fill the form and update its details.
- Bulk Update Cars: Select multiple cars and apply bulk updates to them.
- Delete Car: Remove a car from the inventory.
- List Cars: View a list of all cars in the inventory.
- List Cars Older Than 5 Years: View a list of cars that are older than 5 years.

## Usage

- Managing Cars: Use the forms and controls on the frontend to interact with the car inventory. All data is managed via the backend API endpoints.

## Notes

- Ensure the backend server is running on http://localhost:5001 for the frontend to communicate with it correctly.

## Contact

[Michael Mahachi](mikhach@gmail.com)

## References

HyperionDev Backend - Database Interaction with MongoDB and Mongoose Task(PDF)
Mongoose Crash Course - Beginner Through Advanced - [YouTube Video](https://www.youtube.com/watch?v=DZBGEVgL2eE&t=113s)


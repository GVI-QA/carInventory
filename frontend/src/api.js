import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5001/api";

// Function to add a new car to the database
export const addCar = (car) => axios.post(`${API_URL}/cars`, car);

// Function to update an existing car's details
// Takes the car's ID and updated car data as arguments
export const updateCar = (id, car) => axios.put(`${API_URL}/cars/${id}`, car);

// Function to perform a bulk update on multiple cars
// Takes a query to filter the cars and an update object with the fields to update
export const updateManyCars = (query, update) =>
  axios.patch(`${API_URL}/cars/bulk-patch`, { filter: query, update });

// Function to delete a car from the database
// Takes the car's ID as an argument
export const deleteCar = (id) => axios.delete(`${API_URL}/cars/${id}`);

// Function to list all cars from the database
export const listAllCars = () => axios.get(`${API_URL}/cars`);

// Function to list cars that are older than 5 years
export const listOlderCars = () =>
  axios.get(`${API_URL}/cars/older-than-5-years`);

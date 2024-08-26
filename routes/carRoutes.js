const express = require("express");
const carController = require("../controllers/carController");
const router = express.Router();

// Route to add a new car
router.post("/cars", carController.addCar);

// Route to update a single car by its ID
router.put("/cars/:id", carController.updateCar);

// Route to update multiple cars based on a query
router.put("/cars/bulk-update", carController.updateManyCars);

// Route to delete a car by its ID
router.delete("/cars/:id", carController.deleteCar);

// Route to list all cars
router.get("/cars", carController.listAllCars);

// Route to list cars older than 5 years
router.get("/cars/older-than-5-years", carController.listOlderThan5Years);

// Route to bulk patch cars
router.patch("/cars/bulk-patch", carController.bulkPatch);

module.exports = router;

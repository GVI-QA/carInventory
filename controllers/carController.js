const Car = require("../models/Car");

// Add a new car
exports.addCar = async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).send(newCar); // Respond with the created car
  } catch (error) {
    res.status(400).send(error); // Handle errors
  }
};

// Update a single car
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) return res.status(404).send("Car not found");
    res.send(car); // Respond with the updated car
  } catch (error) {
    res.status(400).send(error); // Handle errors
  }
};

// Update multiple cars using PATCH
exports.bulkPatch = async (req, res) => {
  try {
    const { filter, update } = req.body;

    if (!filter || !update) {
      return res.status(400).json({ error: "Missing filter or update data" });
    }

    const result = await Car.updateMany(filter, { $set: update });
    res.status(200).json(result); // Respond with the result of the update
  } catch (error) {
    console.error("Error during bulkPatch:", error);
    res.status(400).json({ error: error.message }); // Handle errors
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).send("Car not found");
    res.send(car); // Respond with the deleted car
  } catch (error) {
    res.status(400).send(error); // Handle errors
  }
};

// List all cars
exports.listAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars); // Respond with the list of all cars
  } catch (error) {
    res.status(400).send(error); // Handle errors
  }
};

// List cars older than 5 years
exports.listOlderThan5Years = async (req, res) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - 5);
    const cars = await Car.find({ year: { $lt: cutoffDate.getFullYear() } });
    res.send(cars); // Respond with cars older than 5 years
  } catch (error) {
    res.status(400).send(error); // Handle errors
  }
};

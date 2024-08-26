import React, { useState, useEffect } from "react";
import { listAllCars, deleteCar, updateManyCars } from "../api";
import Car from "./Car";
import CarForm from "./CarForm";
import OlderCarsList from "./OlderCarsList";
import { Alert, Button, Form } from "react-bootstrap";

const CarList = () => {
  // State to store the list of cars
  const [cars, setCars] = useState([]);

  // State to store the car currently being edited
  const [carToEdit, setCarToEdit] = useState(null);

  // State to store the IDs of selected cars for bulk update
  const [selectedCars, setSelectedCars] = useState([]);

  // State to store data for bulk updates
  const [bulkUpdateData, setBulkUpdateData] = useState({ owner: "", year: "" });

  // State to trigger refresh of the older cars list
  const [refreshOlderCars, setRefreshOlderCars] = useState(false);

  // State for displaying notifications
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    // Function to fetch the list of all cars
    const fetchCars = async () => {
      try {
        const response = await listAllCars();
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars(); // Call fetchCars to load car data on component mount
  }, []);

  // Function to handle the deletion of a car
  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car._id !== id)); // Update car list after deletion
      setRefreshOlderCars((prev) => !prev); // Trigger refresh of older cars list
      showNotification("Car deleted successfully", "danger");
    } catch (error) {
      console.error("Error deleting car:", error);
      showNotification("Error deleting car", "danger");
    }
  };

  // Function to toggle car selection for bulk updates
  const handleSelectCar = (carId) => {
    setSelectedCars(
      (prevSelected) =>
        prevSelected.includes(carId)
          ? prevSelected.filter((id) => id !== carId) // Remove carId from selection
          : [...prevSelected, carId] // Add carId to selection
    );
  };

  // Function to handle changes in bulk update fields
  const handleBulkUpdateChange = (e) => {
    setBulkUpdateData({
      ...bulkUpdateData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission for bulk updates
  const handleBulkUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const filter = { _id: { $in: selectedCars } };
      const update = {};
      if (bulkUpdateData.owner) update.owner = bulkUpdateData.owner;
      if (bulkUpdateData.year) update.year = bulkUpdateData.year;

      // Ensure at least one field is provided for the update
      if (Object.keys(update).length === 0) {
        showNotification(
          "Please provide at least one field to update.",
          "warning"
        );
        return;
      }

      await updateManyCars(filter, update); // Perform the bulk update
      const response = await listAllCars(); // Refresh the car list
      setCars(response.data);
      setSelectedCars([]); // Clear selected cars
      setBulkUpdateData({ owner: "", year: "" }); // Clear bulk update fields
      setRefreshOlderCars((prev) => !prev); // Trigger refresh of older cars list
      showNotification("Cars updated successfully", "success");
    } catch (error) {
      console.error("Error updating cars:", error);
      showNotification("Error updating cars", "danger");
    }
  };

  // Function to handle the selection of a car for editing
  const handleEdit = (car) => {
    setCarToEdit(car);
  };

  // Function to handle the submission of the car form (add/update)
  const handleSubmit = async () => {
    setCarToEdit(null); // Clear the car being edited
    const response = await listAllCars(); // Refresh the car list
    setCars(response.data);
    setRefreshOlderCars((prev) => !prev); // Trigger refresh of older cars list
    showNotification("Car updated successfully", "success");
  };

  // Function to show notifications
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000); // Hide notification after 5 seconds
  };

  return (
    <div className="container mt-4">
      {/* Display notification if present */}
      {notification.show && (
        <Alert variant={notification.type} className="mb-4">
          {notification.message}
        </Alert>
      )}

      {/* Bulk update form */}
      <h5 className="mb-3">Bulk Update Selected Cars</h5>
      <Form onSubmit={handleBulkUpdateSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Owner</Form.Label>
          <Form.Control
            type="text"
            name="owner"
            value={bulkUpdateData.owner}
            onChange={handleBulkUpdateChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={bulkUpdateData.year}
            onChange={handleBulkUpdateChange}
          />
        </Form.Group>
        <Button type="submit" disabled={selectedCars.length === 0}>
          Update Selected Cars
        </Button>
      </Form>

      {/* Render the car form for adding/editing cars */}
      {carToEdit ? (
        <CarForm car={carToEdit} onSubmit={handleSubmit} />
      ) : (
        <div>
          {/* Render the list of older cars */}
          <OlderCarsList
            key={refreshOlderCars}
            refreshOlderCars={refreshOlderCars}
          />
          {/* Render the list of cars with options to delete and edit */}
          {cars.map((car) => (
            <Car
              key={car._id}
              car={car}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isSelected={selectedCars.includes(car._id)} // Pass whether the car is selected
              onSelect={() => handleSelectCar(car._id)} // Pass selection handler
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;

import React, { useState, useEffect } from "react";
import { addCar, updateCar } from "../api";

const CarForm = ({ car, onSubmit }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    registrationNumber: "",
    owner: "",
    year: "",
  });

  // useEffect to pre-fill the form if editing an existing car
  useEffect(() => {
    if (car) {
      setFormData(car); // Populate the form fields with the car data for editing
    }
  }, [car]);

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field with new value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      if (car) {
        // If editing an existing car, send an update request
        await updateCar(car._id, formData);
      } else {
        // If adding a new car, send a request to add it
        await addCar(formData);
      }
      onSubmit(); // Call the onSubmit callback to refresh the car list or handle form success
    } catch (error) {
      console.error("Error saving car:", error); // Log error if the request fails
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for car details */}
      <input
        name="make"
        placeholder="Make"
        value={formData.make}
        onChange={handleChange}
      />
      <input
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
      />
      <input
        name="registrationNumber"
        placeholder="Registration Number"
        value={formData.registrationNumber}
        onChange={handleChange}
      />
      <input
        name="owner"
        placeholder="Owner"
        value={formData.owner}
        onChange={handleChange}
      />
      <input
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
      />
      {/* Submit button with dynamic text based on whether we're editing or adding */}
      <button type="submit">{car ? "Update Car" : "Add Car"}</button>
    </form>
  );
};

export default CarForm;

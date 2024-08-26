import React, { useState, useEffect } from "react";
import { listOlderCars } from "../api";

const OlderCarsList = ({ refreshOlderCars }) => {
  // State to store the list of older cars
  const [olderCars, setOlderCars] = useState([]);

  useEffect(() => {
    // Function to fetch the list of older cars from the API
    const fetchOlderCars = async () => {
      try {
        // Make an API call to get the list of cars older than 5 years
        const response = await listOlderCars();
        // Update the state with the fetched cars
        setOlderCars(response.data);
      } catch (error) {
        // Log any errors that occur during the API call
        console.error("Error fetching older cars:", error);
      }
    };

    // Call the fetch function to load data when the component mounts or refreshOlderCars changes
    fetchOlderCars();
  }, [refreshOlderCars]);

  return (
    <div>
      <h2>Cars Older Than 5 Years</h2>
      {/* Render a list of older cars */}
      {olderCars.map((car) => (
        <p key={car._id}>
          {car.make} {car.model} - {car.registrationNumber} - {car.owner} -{" "}
          {car.year}
        </p>
      ))}
    </div>
  );
};

export default OlderCarsList;

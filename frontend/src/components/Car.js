import React from "react";
import { Button } from "react-bootstrap";

// Car component displays information about a single car
const Car = ({ car, onDelete, onEdit, isSelected, onSelect }) => {
  return (
    <div className={`card mb-3 ${isSelected ? "bg-info text-white" : ""}`}>
      <div className="card-body">
        {/* Display car make and model as the title */}
        <h3 className="card-title">
          {car.make} {car.model}
        </h3>

        {/* Display car registration number */}
        <p className="card-text">Registration: {car.registrationNumber}</p>

        {/* Display car owner */}
        <p className="card-text">Owner: {car.owner}</p>

        {/* Display car year */}
        <p className="card-text">Year: {car.year}</p>

        {/* Button to edit the car details */}
        <Button variant="warning" onClick={() => onEdit(car)}>
          Edit
        </Button>

        {/* Button to delete the car */}
        <Button
          variant="danger"
          onClick={() => onDelete(car._id)}
          className="ml-2"
        >
          Delete
        </Button>

        {/* Button to select or deselect the car, based on whether it is selected */}
        <Button
          variant={isSelected ? "secondary" : "outline-primary"} // Change button style based on selection status
          onClick={onSelect} // Handle selection toggle
          className="ml-2"
        >
          {isSelected ? "Deselect" : "Select"}{" "}
          {/* Button text based on selection status */}
        </Button>
      </div>
    </div>
  );
};

export default Car;

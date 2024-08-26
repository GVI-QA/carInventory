import React from 'react';
import CarList from './components/CarList';
import CarForm from './components/CarForm';

function App() {
  return (
    <div>
      <h1>Car Inventory</h1>
      <CarForm onSubmit={() => window.location.reload()} />
      <CarList />
    </div>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, Notes } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Notes />} />
          <Route path="/archived" element={<div>Archived Notes</div>} />
          <Route path="/deleted" element={<div>Deleted Notes</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { NotesEditor } from 'components';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, Notes } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Notes />}>
            <Route path=":noteId" element={<NotesEditor />}></Route>
          </Route>
          <Route path="archived" element={<div>Archived Notes</div>} />
          <Route path="deleted" element={<div>Deleted Notes</div>} />
          <Route path="profile" element={<div>Welcome to Profile</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

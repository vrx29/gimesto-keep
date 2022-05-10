import { NotesEditor } from 'components';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Archived, Deleted, Home, Notes } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Notes />}>
            <Route path=":noteId" element={<NotesEditor />}></Route>
          </Route>
          <Route path="archived" element={<Archived />} />
          <Route path="deleted" element={<Deleted />} />
          <Route path="profile" element={<div>Welcome to Profile</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

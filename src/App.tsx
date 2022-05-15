import { NotesEditor } from 'components';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'routes';
import './App.css';
import { Archived, Deleted, Home, Landing, Login, Notes, Profile, Signup } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }>
          <Route path="" element={<Notes />}>
            <Route path=":noteId" element={<NotesEditor />}></Route>
          </Route>
          <Route path="archived" element={<Archived />} />
          <Route path="deleted" element={<Deleted />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

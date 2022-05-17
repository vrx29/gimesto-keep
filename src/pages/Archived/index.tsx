import notesImg from '../../assets/images/notes.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Link } from 'react-router-dom';
import { NoteCard } from '../../components';
import { NotesType } from '../../types/notes';
import { RootState } from '../../app/store';
import { useEffect } from 'react';
import { getArchiveNotes } from 'features/Notes/notesSlice';

export function Archived() {
  const { archivedNotes } = useAppSelector((state: RootState) => state.notes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getArchiveNotes());
  }, []);
  
  return (
    <>
      <div className="inline-block min-h-screen w-full p-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Archived
          <span className="text-sm font-light pl-2">{archivedNotes.length} notes</span>
        </h2>
        {archivedNotes.length > 0 ? (
          <div className="flex gap-2 flex-wrap mt-4">
            {archivedNotes.map((i: NotesType) => (
              <NoteCard key={i._id} note={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-sm mt-16 mx-auto">
            <img src={notesImg} alt="Notes not found image" className="max-w-full" />
            <p className="my-2 text-gray-500">No Archived notes found</p>
            <Link
              to="/notes"
              className="text-white bg-teal-600 focus:outline-none hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">
              Go back to notes
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

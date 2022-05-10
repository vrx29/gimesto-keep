import notesImg from '../../assets/images/notes.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NoteCard } from 'components';
import { Link } from 'react-router-dom';
import { clearDeletedNotes } from 'features/Notes/notesSlice';
import { toast, ToastContainer } from 'react-toastify';

export function Deleted() {
  const { deletedNotes } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  const deleteAllNotes = (e) => {
    e.stopPropagation();
    dispatch(clearDeletedNotes());
    toast.success('All Notes deleted successfully', { autoClose: 500 });
  };

  return (
    <>
      <div className="inline-block min-h-screen w-full p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Deleted
            <span className="text-sm font-light pl-2">{deletedNotes.length} notes</span>
          </h2>
          <button
            type="button"
            onClick={deleteAllNotes}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            Delete All Notes
          </button>
        </div>

        {deletedNotes.length > 0 ? (
          <div className="flex gap-2 flex-wrap mt-4">
            {deletedNotes.map((i) => (
              <NoteCard key={i.id} note={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-sm mt-16 mx-auto">
            <img src={notesImg} alt="Notes not found image" className="max-w-full" />
            <p className="my-2 text-gray-500">No Deleted notes found</p>
            <Link
              to="/"
              className="text-white bg-teal-600 focus:outline-none hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">
              Go back to notes
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

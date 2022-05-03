import { ArchiveIcon, DeleteIcon, FilterIcon } from '../../assets/icons';
import { NotesEditor } from '../../components';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentNote, deleteNote } from 'features/Notes/notesSlice';
import { useNavigate } from 'react-router-dom';
export function Notes() {
  const { data: notes, currentNote } = useSelector((state: RootState) => state.notes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateNote = (id: string) => {
    navigate(id);
  };

  const deleteNoteHandler = (e: any, id: string) => {
    e.stopPropagation();

    if (currentNote.id === id) {
      dispatch(clearCurrentNote());
    }
    dispatch(deleteNote(id));
  };

  return (
    <div className="flex min-h-screen">
      <section className="min-w-[380px] max-w-sm shrink-0 p-4 overscroll-contain overflow-y-auto sticky max-h-screen">
        <div className="">
          <input
            type="search"
            placeholder="Search notes"
            className="w-full h-10 rounded-lg pl-2 outline-none"
          />
        </div>
        <div className="my-4 flex justify-between items-center">
          <button
            type="button"
            className="text-white bg-teal-600 focus:outline-none hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">
            Create new note
          </button>
          <button
            type="button"
            className="flex items-center text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
            Filters
            <span className='ml-4 text-lg text-gray-500'>
              <FilterIcon />
            </span>
          </button>
        </div>
        <ul className="mt-4">
          {notes &&
            notes.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-lg p-2 mb-2"
                onClick={() => navigateNote(item.id)}>
                <p className="text-sm font-medium overflow-hidden	whitespace-nowrap	text-ellipsis">
                  {item.title}
                </p>
                <p className="text-sm my-1 text-gray-600 overflow-hidden whitespace-nowrap	text-ellipsis">
                  {item.content && JSON.parse(item.content).blocks[0].text}
                </p>
                <div className="flex gap-1 my-2">
                  {item.labels.map((label, id) => (
                    <span
                      key={id}
                      className="text-xs py-0.5 px-2 rounded-md bg-orange-200 text-slate-700">
                      {label}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center gap-2 text-xl text-slate-700">
                  <p className="text-xs text-gray-400">Created on : {item.created}</p>
                  <div className="flex gap-2">
                    <button className="text">
                      <ArchiveIcon />
                    </button>
                    <button className="text-red-400" onClick={(e) => deleteNoteHandler(e, item.id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </section>
      <NotesEditor />
    </div>
  );
}

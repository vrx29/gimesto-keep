import { ArchiveIcon, DeleteIcon, FilterIcon } from 'assets/icons';
import notesImg from 'assets/images/notes.svg';
import { Filters, NotesEditor } from 'components';
import { clearCurrentNote, archiveNote, getNotes, trashNote } from 'features/Notes/notesSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { filtersType, NotesType } from 'types/notes';

export function Notes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { data, currentNote, filters } = useAppSelector((state: any) => state.notes);
  const [notes, setNotes] = useState(data || []);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [data]);

  const filteredNotes = (data: Array<NotesType>, filters: filtersType) => {
    let newNotes = data;
    interface IOrderObject {
      Low: number;
      Medium: number;
      High: number;
      [key: string]: number;
    }
    const order: IOrderObject = { Low: 1, Medium: 2, High: 3 };

    if (filters.priority === 'Low to High') {
      newNotes = [...newNotes].sort((a, b) => order[a.priority] - order[b.priority]);
    }
    if (filters.priority === 'High to Low') {
      newNotes = [...newNotes].sort((a, b) => order[b.priority] - order[a.priority]);
    }

    if (filters.sortByTime === 'Recent first') {
      newNotes = [...newNotes].reverse();
    }

    if (filters.labels && filters.labels.length > 0) {
      newNotes = [...newNotes].filter((item) =>
        item.labels.some((i: any) => filters.labels.includes(i))
      );
    }
    return newNotes;
  };
  useEffect(() => {
    const newNotes = filteredNotes(data, filters);
    setNotes(newNotes);
  }, [filters]);

  const archiveNoteHandler = (e: any, item: NotesType) => {
    e.stopPropagation();
    dispatch(archiveNote({ noteId: item._id, note: item }));
    toast.success('Note archived successfully', { autoClose: 500 });
  };

  const deleteNoteHandler = (e: any, id: string) => {
    e.stopPropagation();
    dispatch(trashNote(id));

    if (currentNote._id === id) {
      dispatch(clearCurrentNote());
      navigate('/notes/1');
    }
    // dispatch(deleteNote(id));
    toast.success('Note deleted successfully', { autoClose: 500 });
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const newNotes = data.filter((item: NotesType) => {
        return item.title.toLowerCase().startsWith(searchQuery.toLowerCase());
      });
      setNotes(newNotes);
    } else {
      setNotes(data);
    }
  }, [searchQuery]);

  return (
    <div className="flex min-h-screen">
      <section className="relative min-w-[380px] max-w-sm shrink-0 p-4 overscroll-contain overflow-y-auto sticky max-h-screen">
        <div className="">
          <input
            type="search"
            placeholder="Search notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 rounded-lg pl-2 outline-none"
          />
        </div>
        <div className="my-4 flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/notes/1')}
            className="text-white bg-teal-600 focus:outline-none hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">
            Create new note
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="flex items-center text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
            Filters
            <span className="ml-4 text-lg text-gray-500">
              <FilterIcon />
            </span>
          </button>
        </div>

        {showFilters && <Filters setShowFilters={setShowFilters} />}

        {notes.length > 0 ? (
          <ul className="mt-4">
            {notes.map((item: any) => (
              <li
                key={item._id}
                className="bg-white rounded-lg p-2 mb-2"
                onClick={() => navigate(`/notes/${item._id}`)}>
                <p className="text-sm font-medium overflow-hidden	whitespace-nowrap	text-ellipsis">
                  {item.title}
                </p>
                <p className="text-sm my-1 text-gray-600 overflow-hidden whitespace-nowrap	text-ellipsis">
                  {item.content && JSON.parse(item.content).blocks[0].text}
                </p>
                <div className="flex gap-1 my-2">
                  {item.labels.map((label: any, id: any) => (
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
                    <button className="text" onClick={(e) => archiveNoteHandler(e, item)}>
                      <ArchiveIcon />
                    </button>
                    <button
                      className="text-red-400"
                      onClick={(e) => deleteNoteHandler(e, item._id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-16 px-8">
            <img src={notesImg} alt="Notes image" />
            <p className="text-center pt-4 text-gray-400">No notes found</p>
          </div>
        )}
      </section>
      <NotesEditor />
    </div>
  );
}

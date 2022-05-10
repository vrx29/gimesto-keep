import { useAppDispatch } from 'app/hooks';
import { ArchiveIcon } from 'assets/icons';
import { unArchiveNotes } from 'features/Notes/notesSlice';
import { useLocation } from 'react-router-dom';
import { NotesType } from 'types/notes';

type NoteCardType = {
  note: NotesType;
};
export function NoteCard({ note }: NoteCardType): JSX.Element {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const archiveNoteHandler = (e: any, id: string) => {
    e.stopPropagation();
    dispatch(unArchiveNotes(id));
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-sm">
      <h6 className="font-medium overflow-hidden whitespace-nowrap text-ellipsis">{note.title}</h6>
      <p className="text-sm my-1 text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
        {note.content && JSON.parse(note.content).blocks[0].text}
      </p>
      <div className="flex gap-1 my-2">
        {note.labels.map((label: any, id: any) => (
          <span key={id} className="text-xs py-0.5 px-2 rounded-md bg-orange-200 text-slate-700">
            {label}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center gap-2 text-xl text-slate-700">
        <p className="text-xs text-gray-400">Created on : {note.created}</p>
        <div className="flex gap-2">
          {pathname === '/archived' && (
            <button className="text" onClick={(e) => archiveNoteHandler(e, note.id)}>
              <ArchiveIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

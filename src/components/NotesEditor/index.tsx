import { Dispatch, SetStateAction, useState } from 'react';
import { NotesType } from '../../types/notes';
import { EditNote } from '../EditNote';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditorState } from 'draft-js';

type NotesEditorPropType = {
  notes: Array<NotesType>;
  setNotes: Dispatch<SetStateAction<Array<NotesType>>>;
};

export function NotesEditor({ notes, setNotes }: NotesEditorPropType) {
  const [title, setTitle] = useState<string>('');
  const [noteColor, setNoteColor] = useState<string>('bg-white');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [content, setContent] = useState<{}>();

  const addNote = () => {
    if (title.length < 1) {
      toast.warn('Please enter note title', { autoClose: 1000 });
    } else {
      setNotes([...notes, { title, noteColor, content, created: new Date().toDateString() }]);
      setTitle('');
      setNoteColor('bg-white');
      setContent(() => EditorState.createEmpty());
      setEditorState(() => EditorState.createEmpty());
      toast.success('Note added successfully', { autoClose: 1000 });
    }
  };

  return (
    <div className={`p-4 h-screen ${noteColor}`}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Give your note a title"
        className="placeholder-slate-300 w-full h-12 bg-transparent text-xl font-semibold outline-none"
      />

      <EditNote
        editorState={editorState}
        setEditorState={setEditorState}
        setNoteColor={setNoteColor}
        setContent={setContent}
      />

      <div className="my-4">
        <button
          type="button"
          onClick={addNote}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600">
          Add note
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

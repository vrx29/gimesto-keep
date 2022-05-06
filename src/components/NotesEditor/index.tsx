import { useEffect, useState } from 'react';
import { EditNote } from '../EditNote';
import { ToastContainer, toast } from 'react-toastify';
import { convertFromRaw, EditorState } from 'draft-js';
import { labelsData } from '../../data/labelsData';
import { Label } from '../Label';
import { addNote, findNote } from 'features/Notes/notesSlice';
import { v4 as uuid } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';

export function NotesEditor() {
  const currentNote = useAppSelector((state) => state.notes.currentNote);
  const { noteId } = useParams();
  const [title, setTitle] = useState<string>('');
  const [noteColor, setNoteColor] = useState<string>('bg-white');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [content, setContent] = useState<{}>();
  const [labels, setLabels] = useState<Array<string>>([]);
  const [priority, setPriority] = useState<string>('Low');

  // Redux Dispatcher for dispatching actions
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (noteId) {
      dispatch(findNote(noteId));
    }
  }, [noteId]);

  useEffect(() => {
    updateState();
  }, [currentNote]);

  const updateState = () => {
    setTitle(currentNote.title || '');
    setNoteColor(currentNote.noteColor || 'bg-white');
    setLabels(currentNote.labels || []);
    setPriority(currentNote.priority || 'Low');
    setContent(currentNote.content || {});

    if (currentNote.content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(currentNote.content)))
      );
    } else {
      setEditorState(() => EditorState.createEmpty());
    }
  };

  const changeLabel = (label: string) => {
    if (labels.includes(label)) {
      const data = labels.filter((i) => i !== label);
      setLabels(data);
    } else {
      setLabels([...labels, label]);
    }
  };

  const changePriority = (e: any) => {
    e.preventDefault();
    setPriority(e.target.value);
  };

  const clearNote = () => {
    setTitle('');
    setNoteColor('bg-white');
    setLabels([]);
    setContent(() => EditorState.createEmpty());
    setEditorState(() => EditorState.createEmpty());
    setPriority('Low');
  };

  const saveNote = () => {
    if (title.length < 1) {
      toast.warn('Please enter note title', { autoClose: 1000 });
    } else {
      dispatch(
        addNote({
          id: uuid(),
          title,
          noteColor,
          content,
          created: new Date().toDateString(),
          priority,
          labels
        })
      );
      clearNote();
      toast.success('Note added successfully', { autoClose: 1000 });
    }
  };

  return (
    <section className={`grow max-h-screen overscroll-contain overflow-y-auto p-4 ${noteColor}`}>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={clearNote}
          className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
          Clear
        </button>
        <button
          type="button"
          onClick={saveNote}
          className="text-white bg-teal-600 focus:outline-none hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5">
          Save note
        </button>
      </div>
      <div className="bg-stone-200 h-px my-2"></div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Give your note a title"
        className="placeholder-slate-300 w-full h-12 my-2 bg-transparent text-xl font-semibold outline-none"
      />

      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => changePriority(e)}
          className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {labelsData.map((data) => (
          <Label key={data.id} labels={labels} data={data} changeLabel={changeLabel} />
        ))}
      </div>
      <EditNote
        editorState={editorState}
        setEditorState={setEditorState}
        setNoteColor={setNoteColor}
        setContent={setContent}
      />

      <ToastContainer />
    </section>
  );
}

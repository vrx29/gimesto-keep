import { Dispatch, SetStateAction, useEffect } from 'react';
import 'draft-js/dist/Draft.css';
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import { BoldIcon, ItalicIcon, StrikeIcon, UnderlinedIcon } from '../../assets/icons';
import './editNote.css';
type EditNoteType = {
  editorState: any;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  setNoteColor: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<Object>>;
};

export function EditNote({
  setNoteColor,
  setContent,
  editorState,
  setEditorState
}: EditNoteType): JSX.Element {
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const toggleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  const toggleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };
  const toggleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };
  const toggleStrikeThrough = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  useEffect(() => {
    setContent(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-0.5">
          <button
            onClick={toggleBold}
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
            <BoldIcon />
          </button>
          <button
            onClick={toggleItalic}
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
            <ItalicIcon />
          </button>
          <button
            onClick={toggleUnderline}
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
            <UnderlinedIcon />
          </button>
          <button
            onClick={toggleStrikeThrough}
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
            <StrikeIcon />
          </button>
        </div>
        <div className="flex gap-0.5">
          <button
            onClick={() => setNoteColor('bg-white')}
            className="bg-white rounded-full border-2 border-gray-300 h-8 w-8"></button>
          <button
            onClick={() => setNoteColor('bg-orange-100')}
            className="bg-orange-100 rounded-full border-2 border-gray-300 h-8 w-8"></button>
          <button
            onClick={() => setNoteColor('bg-green-100')}
            className="bg-green-100 rounded-full border-2 border-gray-300 h-8 w-8"></button>
          <button
            onClick={() => setNoteColor('bg-purple-100')}
            className="bg-purple-100 rounded-full border-2 border-gray-300 h-8 w-8"></button>
        </div>
      </div>

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Content of your note goes here..."
      />
    </>
  );
}

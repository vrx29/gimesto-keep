import { Dispatch, SetStateAction, useEffect } from 'react';
import 'draft-js/dist/Draft.css';
import { convertToRaw, Editor, EditorState, RichUtils } from 'draft-js';
import './editNote.css';
import { textModifiers } from '../../data/textModifiers';
import { noteColors } from '../../data/noteColors';

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
  const toggleText = (toggle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, toggle));
  };

  useEffect(() => {
    setContent(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <div className="flex gap-1">
          {textModifiers.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleText(item.toggle)}
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-2.5 py-2.5">
              {item.icon}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {noteColors.map((item) => (
            <button
              key={item.id}
              onClick={() => setNoteColor(item.color)}
              className={`${item.color} border border-gray-300 rounded-lg text-sm px-4 py-4`}></button>
          ))}
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

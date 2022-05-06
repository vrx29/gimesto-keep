import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotesType } from '../../types/notes';

export interface NotesState {
  data: Array<NotesType>;
  currentNote: NotesType;
}

const initialState: NotesState = {
  data: [] as Array<NotesType>,
  currentNote: {} as NotesType
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NotesType>) => {
      state.data.push(action.payload);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const { data: oldNotes } = state;
      state.data = oldNotes.filter((item) => item.id !== action.payload);
    },
    findNote: (state, action: PayloadAction<string>) => {
      const data = state.data;
      state.currentNote = data.find((item) => item.id === action.payload) || ({} as NotesType);
    },
    clearCurrentNote: (state) => {
      state.currentNote = {} as NotesType;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addNote, deleteNote, findNote, clearCurrentNote } = notesSlice.actions;

export default notesSlice.reducer;

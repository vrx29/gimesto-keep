import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filtersType, NotesType } from '../../types/notes';

interface NotesState {
  data: Array<NotesType>;
  currentNote: NotesType;
  filters: filtersType;
}

const initialState: NotesState = {
  data: [] as Array<NotesType>,
  currentNote: {} as NotesType,
  filters: {} as filtersType
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
    updateNote: (state, action: PayloadAction<{ noteId: string; data: {} }>) => {
      const { noteId, data } = action.payload;
      state.data = state.data.map((note) => (note.id === noteId ? { ...note, ...data } : note));
    },
    clearCurrentNote: (state) => {
      state.currentNote = {} as NotesType;
    },
    saveFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {} as filtersType;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  addNote,
  deleteNote,
  findNote,
  clearCurrentNote,
  updateNote,
  saveFilters,
  clearFilters
} = notesSlice.actions;

export default notesSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserStateType } from 'types';
import { filtersType, NotesType } from '../../types/notes';

interface NotesState {
  data: Array<NotesType>;
  archivedNotes: Array<NotesType>;
  deletedNotes: Array<NotesType>;
  currentNote: NotesType;
  filters: filtersType;
}

const initialState: NotesState = {
  data: [] as Array<NotesType>,
  archivedNotes: [] as Array<NotesType>,
  deletedNotes: [] as Array<NotesType>,
  currentNote: {} as NotesType,
  filters: {} as filtersType
};

const getNotes = createAsyncThunk('notes/getNotes', async (_, { getState }) => {
  const { user } = getState() as { user: UserStateType };
  const res = await axios.get('/api/notes', {
    headers: {
      authorization: user.user.authToken
    }
  });
  return res.data.notes;
});

const addNoteAPI = createAsyncThunk('/notes/addNotesAPI', async (note: any, { getState }) => {
  const { user } = getState() as { user: UserStateType };
  const response = await axios.post(
    '/api/notes',
    { note },
    {
      headers: {
        authorization: user.user.authToken
      }
    }
  );
  return response.data.notes;
});

const updateNote = createAsyncThunk(
  '/notes/updateNote',
  async (params: { noteId: string; note: {} }, { getState }) => {
    const { user } = getState() as { user: UserStateType };
    const response = await axios.post(
      `/api/notes/${params.noteId}`,
      { note: params.note },
      {
        headers: {
          authorization: user.user.authToken
        }
      }
    );
    return response.data.notes;
  }
);

const deleteNote = createAsyncThunk('/notes/deleteNote', async (noteId: string, { getState }) => {
  const { user } = getState() as { user: UserStateType };
  const response = await axios.delete(`/api/notes/${noteId}`, {
    headers: {
      authorization: user.user.authToken
    }
  });
  return response.data.notes;
});

const getArchiveNotes = createAsyncThunk('/notes/getArchiveNotes', async (_, { getState }) => {
  const { user } = getState() as { user: UserStateType };
  const res = await axios.get('/api/archives', {
    headers: {
      authorization: user.user.authToken
    }
  });
  const data = res.data.archives;
  return data;
});

const archiveNote = createAsyncThunk(
  '/notes/archiveNote',
  async (params: { noteId: string; note: NotesType }, { getState }) => {
    const { user } = getState() as { user: UserStateType };
    const response = await axios.post(
      `/api/notes/archives/${params.noteId}`,
      { note: params.note },
      {
        headers: {
          authorization: user.user.authToken
        }
      }
    );
    return response.data.notes;
  }
);

const restoreArchiveNote = createAsyncThunk(
  '/notes/restoreArchiveNote',
  async (noteId: string, { getState }) => {
    const { user } = getState() as { user: UserStateType };
    const response = await axios.post(
      `/api/archives/restore/${noteId}`,
      {},
      {
        headers: {
          authorization: user.user.authToken
        }
      }
    );
    return response.data;
  }
);

const deleteArchiveNote = createAsyncThunk(
  '/notes/deleteArchiveNote',
  async (noteId: string, { getState }) => {
    const { user } = getState() as { user: UserStateType };
    const response = await axios.delete(`/api/archives/delete/${noteId}`, {
      headers: {
        authorization: user.user.authToken
      }
    });
    return response.data.archives;
  }
);

const getDeletedNotes = createAsyncThunk('/notes/getDeletedNotes', async (_, { getState }) => {
  const { user } = getState() as { user: UserStateType };
  const response = await axios.get('/api/trash', {
    headers: {
      authorization: user.user.authToken
    }
  });
  return response.data.trash;
});

const trashNote = createAsyncThunk('/notes/trashNote', async (noteId: string, { getState }) => {
  const { user } = getState() as { user: UserStateType };
  try {
    const response = await axios.post(
      `/api/notes/trash/${noteId}`,
      {},
      {
        headers: {
          authorization: user.user.authToken
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const restoreTrashNote = createAsyncThunk(
  '/notes/restoreTrashNote',
  async (noteId: string, { getState }) => {
    const { user } = getState() as { user: UserStateType };
    const response = await axios.post(
      `/api/trash/restore/${noteId}`,
      {},
      {
        headers: {
          authorization: user.user.authToken
        }
      }
    );
    return response.data;
  }
);

const deleteTrashNote = createAsyncThunk(
  '/notes/deleteTrashNote',
  async (noteId: string, { getState }) => {
    const { user } = getState() as { user: UserStateType };
    const response = await axios.delete(`/api/trash/delete/${noteId}`, {
      headers: {
        authorization: user.user.authToken
      }
    });
    return response.data.trash;
  }
);

const deleteAllTrashNotes = createAsyncThunk(
  '/notes/deleteAllTrashNotes',
  async (_, { getState }) => {
    const { user } = getState() as { user: UserStateType };
    const response = await axios.delete('/api/trash/delete', {
      headers: {
        authorization: user.user.authToken
      }
    });
    return response.data.trash;
  }
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    findNote: (state, action: PayloadAction<string>) => {
      const data = state.data;
      state.currentNote = data.find((item) => item._id === action.payload) || ({} as NotesType);
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
  },
  extraReducers: (builder) => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addNoteAPI.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getArchiveNotes.fulfilled, (state, action) => {
      state.archivedNotes = action.payload;
    });
    builder.addCase(restoreArchiveNote.fulfilled, (state, action) => {
      state.data = action.payload.notes;
      state.archivedNotes = action.payload.archives;
    });
    builder.addCase(deleteArchiveNote.fulfilled, (state, action) => {
      state.archivedNotes = action.payload;
    });
    builder.addCase(getDeletedNotes.fulfilled, (state, action) => {
      state.deletedNotes = action.payload;
    });
    builder.addCase(trashNote.fulfilled, (state, action) => {
      state.data = action.payload.notes;
      state.deletedNotes = action.payload.trash;
    });
    builder.addCase(restoreTrashNote.fulfilled, (state, action) => {
      state.data = action.payload.notes;
      state.deletedNotes = action.payload.trash;
    });
    builder.addCase(deleteTrashNote.fulfilled, (state, action) => {
      state.deletedNotes = action.payload;
    });
    builder.addCase(deleteAllTrashNotes.fulfilled, (state, action) => {
      state.deletedNotes = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const { findNote, clearCurrentNote, saveFilters, clearFilters } = notesSlice.actions;

export {
  getNotes,
  addNoteAPI,
  deleteNote,
  updateNote,
  getArchiveNotes,
  archiveNote,
  restoreArchiveNote,
  deleteArchiveNote,
  getDeletedNotes,
  trashNote,
  restoreTrashNote,
  deleteTrashNote,
  deleteAllTrashNotes
};
export default notesSlice.reducer;

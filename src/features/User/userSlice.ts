import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserStateType, UserType } from 'types';
const user = localStorage.getItem('user');

const initialState: UserStateType = {
  loading: false,
  user: user ? JSON.parse(user) : ({} as UserType),
  error: ''
};

const loginUser = createAsyncThunk('user/loginUser', async (data: any) => {
  try {
    const res = await axios.post('/api/auth/login', data);
    if (res.status === 200) {
      const { firstName, lastName, email } = res.data.foundUser;
      const authToken = res.data.encodedToken;
      localStorage.setItem('user', JSON.stringify({ firstName, lastName, email, authToken }));
      return { firstName, lastName, email, authToken };
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response.data.errors[0]);
  }
});

const signUpUser = createAsyncThunk('user/signUpUser', async (data: any) => {
  try {
    const res = await axios.post('/api/auth/signup', data);
    if (res.status === 201) {
      const { firstName, lastName, email } = res.data.createdUser;
      const authToken = res.data.encodedToken;
      localStorage.setItem('user', JSON.stringify({ firstName, lastName, email, authToken }));
      return { firstName, lastName, email, authToken };
    }
  } catch (error: any) {
    throw new Error(error.response.data.errors[0]);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFormError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
    logout: (state) => {
      localStorage.clear();
      state.loading = false;
      state.user = {} as UserType;
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload as UserType;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {} as UserType;
      state.error = action.error.message as string;
    });
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload as UserType;
      state.error = '';
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {} as UserType;
      state.error = action.error.message as string;
    });
  }
});

export const { setFormError, clearError, logout } = userSlice.actions;
export { loginUser, signUpUser };
export default userSlice.reducer;

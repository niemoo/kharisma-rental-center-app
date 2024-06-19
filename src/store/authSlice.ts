import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface IAuthState {
  authState: boolean;
  token: string | null;
  totalDay: number;
  selectedCarId: number;
}

const initialState: IAuthState = {
  authState: false,
  token: null,
  totalDay: 1,
  selectedCarId: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        const decoded: any = jwtDecode(action.payload);
        state.authState = decoded.exp * 1000 > Date.now();
      } else {
        state.authState = false;
      }
    },
    setTotalDay: (state, action: PayloadAction<number>) => {
      state.totalDay = action.payload;
    },
    setSelectedCarId: (state, action: PayloadAction<number>) => {
      state.selectedCarId = action.payload;
    },
    verifyToken: (state) => {
      if (state.token) {
        const decoded: any = jwtDecode(state.token);
        state.authState = decoded.exp * 1000 > Date.now();
      } else {
        state.authState = false;
      }
    },
    initializeApp: (state) => {
      // This can be used to trigger any initialization logic
      state.token && state.authState;
    },
  },
});

export const { setAuthState, setToken, setTotalDay, setSelectedCarId, verifyToken, initializeApp } = authSlice.actions;
export const authReducer = authSlice.reducer;

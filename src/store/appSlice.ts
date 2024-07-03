import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  isLogin: boolean;
  token: string | null;
  userId: number | null;
}

interface IFormData {
  isBook: boolean;
  selectedCarId: number;
  userFullname: string;
  carName: string;
  alamat: string;
  instagram: string;
  tujuanSewa: string;
  rute: string;
  jaminan: string;
  totalPrice: string;
  tempatAmbil: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  totalDays: number;
}

interface IAppState extends AuthState, IFormData {}

const initialState: IAppState = {
  isLogin: false,
  token: null,
  userId: null,
  isBook: false,
  selectedCarId: 0,
  userFullname: '',
  carName: '',
  alamat: '',
  instagram: '',
  tujuanSewa: '',
  rute: '',
  jaminan: '',
  totalPrice: '',
  startTime: '',
  endTime: '',
  startDate: '',
  endDate: '',
  tempatAmbil: '',
  totalDays: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        const decoded: any = jwtDecode(action.payload);
        state.isLogin = decoded.exp * 1000 > Date.now();
      } else {
        state.isLogin = false;
      }
    },
    setTotalDays: (state, action: PayloadAction<number>) => {
      state.totalDays = action.payload;
    },
    setIsBook: (state, action: PayloadAction<boolean>) => {
      state.isBook = action.payload;
    },
    setSelectedCarId: (state, action: PayloadAction<number>) => {
      state.selectedCarId = action.payload;
    },
    verifyToken: (state) => {
      if (state.token) {
        const decoded: any = jwtDecode(state.token);
        state.isLogin = decoded.exp * 1000 > Date.now();
      } else {
        state.isLogin = false;
      }
    },
    setUserFullname: (state, action: PayloadAction<string>) => {
      state.userFullname = action.payload;
    },
    setCarName: (state, action: PayloadAction<string>) => {
      state.carName = action.payload;
    },
    setAlamat: (state, action: PayloadAction<string>) => {
      state.alamat = action.payload;
    },
    setInstagram: (state, action: PayloadAction<string>) => {
      state.instagram = action.payload;
    },
    setTujuanSewa: (state, action: PayloadAction<string>) => {
      state.tujuanSewa = action.payload;
    },
    setRute: (state, action: PayloadAction<string>) => {
      state.rute = action.payload;
    },
    setJaminan: (state, action: PayloadAction<string>) => {
      state.jaminan = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<string>) => {
      state.totalPrice = action.payload;
    },
    setTempatAmbil: (state, action: PayloadAction<string>) => {
      state.tempatAmbil = action.payload;
    },
    setStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    initializeApp: (state) => {
      // This can be used to trigger any initialization logic
      state.token && state.isLogin;
    },
  },
});

export const {
  setIsLogin,
  setToken,
  setTotalDays,
  setIsBook,
  setSelectedCarId,
  verifyToken,
  setUserFullname,
  setCarName,
  setAlamat,
  setInstagram,
  setTujuanSewa,
  setRute,
  setJaminan,
  setTotalPrice,
  setTempatAmbil,
  setStartTime,
  setEndTime,
  setStartDate,
  setEndDate,
  initializeApp,
} = appSlice.actions;

export const appReducer = appSlice.reducer;

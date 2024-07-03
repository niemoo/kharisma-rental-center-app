import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { appReducer, initializeApp } from '@/store/appSlice';
import tokenMiddleware from './tokenMiddleware';
import { persistReducer, persistStore } from 'redux-persist';
import storage from '@/utils/storage-persist';

// Persist config for the app slice
const appPersistConfig = {
  key: 'app',
  storage,
  whitelist: ['isLogin', 'token', 'totalDays', 'isBook', 'selectedCarId', 'userFullname', 'carName', 'alamat', 'instagram', 'tujuanSewa', 'rute', 'jaminan', 'totalPrice', 'tempatAmbil', 'startTime', 'endTime', 'startDate', 'endDate'],
};

const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(tokenMiddleware),
});

export const persistor = persistStore(store);

// Dispatch the initializeApp action to trigger the middleware and any initialization logic
store.dispatch(initializeApp());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

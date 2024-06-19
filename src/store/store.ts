import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { authReducer, initializeApp } from '@/store/authSlice';
import tokenMiddleware from './tokenMiddleware';
import { persistReducer, persistStore } from 'redux-persist';
import storage from '@/utils/storage-persist';

// Persist config for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['authState', 'token', 'totalDay', 'selectedCarId'], // Add 'token' to whitelist if you want to persist it
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
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

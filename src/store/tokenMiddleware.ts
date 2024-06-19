import { Middleware } from 'redux';
import { verifyToken, initializeApp } from '@/store/authSlice';
import type { AnyAction, Dispatch } from '@reduxjs/toolkit';

// Middleware untuk memverifikasi token saat inisialisasi store
const tokenMiddleware: Middleware<{}, any, Dispatch<AnyAction>> = (store) => (next) => (action) => {
  if (initializeApp.match(action)) {
    store.dispatch(verifyToken());
  }
  return next(action);
};

export default tokenMiddleware;

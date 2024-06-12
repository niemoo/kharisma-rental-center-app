'use client';

import { Fragment, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '@/app/context/user';
import { deleteCookie } from 'cookies-next';

export default function About() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext must be used within a UserContextProvider');
  }

  const { user, setUser } = userContext;

  const onDelete = () => {
    deleteCookie('refreshToken', { path: '/' });
    console.log('Cookie deleted');
  };

  return (
    <main className="max-w-screen-xl mx-auto md:p-0 md:pt-5 p-5">
      <div className="grid md:grid-cols-3 gap-5">
        <p>Halaman About</p>
        <button onClick={onDelete}>Delete cookie</button>
      </div>
    </main>
  );
}

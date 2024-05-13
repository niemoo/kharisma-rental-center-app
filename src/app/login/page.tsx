'use client';
import { useState, useEffect } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json(); // Mengonversi responsenya menjadi objek JSON

      if (res.ok) {
        setResponseMessage(data.data);
      } else {
        setResponseMessage(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log(responseMessage); // Akan mencetak responseMessage setiap kali nilainya berubah
  }, [responseMessage]);

  return (
    <div className="max-w-screen-md mx-auto">
      <form className="w-1/2 mx-auto mt-20 bg-white p-5 rounded-lg shadow-xl border border-gray-500" onSubmit={handleLogin}>
        <h2 className="text-2xl font-semibold">Masuk</h2>
        <input type="text" name="username" id="username" placeholder="Username" className="w-full p-2 mt-5 border border-gray-500 rounded" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" name="password" id="password" placeholder="Password" className="w-full p-2 mt-5 border border-gray-500 rounded" onChange={(e) => setPassword(e.target.value)} />
        <div className="w-full flex justify-end mt-5">
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

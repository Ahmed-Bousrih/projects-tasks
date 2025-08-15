'use client';

import { useState } from 'react';
import { api } from '../../../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.access_token;

      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-200"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">Login</h1>
		<input
			type="email"
			placeholder="Email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			className="border-2 border-gray-300 p-3 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			required
		/>

		<input
			type="password"
			placeholder="Password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			className="border-2 border-gray-300 p-3 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			required
		/>

        <button
          type="submit"
          className={`p-3 rounded-lg text-white font-semibold transition-colors ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <p className="text-red-600 text-center font-medium mt-2">{error}</p>
        )}
      </form>
    </div>
  );
}

"use client";
import { getSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from "next/link";
//import { getCurrentUser } from 'aws-amplify/auth';
function Login({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        // callbackUrl: `${window.location.origin}/user`, // ✅ fix redirect
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.url) {
         // ✅ only call if login succeeded
        // router.push(result.url);
        onSignedIn();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col m-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 p-2 rounded-xl text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link href="/register" className="text-blue-600 hover:underline">
        {"Don't have an account? Register"}
        </Link>
      </div>
    </main>
  );
}

function Logout({ onSignedOut }: { onSignedOut: () => void }) {
  return (
    <div className="flex w-full text-center mt-8">
      <button
        className="p-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 w-full"
        onClick={async () => {
          await signOut({ redirect: false });
          onSignedOut();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default function LoginPage() {
  const [user, setUser] = useState<object | null | undefined>(undefined);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currUser = await getSession();
        console.log(currUser);
        setUser(currUser);
      } catch (e) {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  if (user) {
    return (<Logout onSignedOut={() => {setUser(null);}} />);
  }

  return (
    <Login
      onSignedIn={async () => {
        const currUser = await getSession();
        setUser(currUser);
      }}
    />
  );
}
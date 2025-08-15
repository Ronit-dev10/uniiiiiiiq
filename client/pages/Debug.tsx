import { useState } from 'react';
import { userService } from '../services/userService';
import { User } from '../services/userService';

export function Debug() {
  const [users, setUsers] = useState<User[]>(userService.getAllUsers());
  const [session, setSession] = useState(userService.getCurrentSession());

  const refreshData = () => {
    setUsers(userService.getAllUsers());
    setSession(userService.getCurrentSession());
  };

  const clearAllData = () => {
    userService.clearAllData();
    refreshData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-plus-jakarta">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Debug: User Storage</h1>
            <div className="space-x-4">
              <button
                onClick={refreshData}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Refresh
              </button>
              <button
                onClick={clearAllData}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear All Data
              </button>
            </div>
          </div>

          {/* Current Session */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Current Session</h2>
            <div className="bg-gray-50 p-4 rounded">
              {session ? (
                <pre className="text-sm">{JSON.stringify(session, null, 2)}</pre>
              ) : (
                <p className="text-gray-500">No active session</p>
              )}
            </div>
          </div>

          {/* All Users */}
          <div>
            <h2 className="text-lg font-semibold mb-2">
              All Registered Users ({users.length})
            </h2>
            <div className="space-y-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user.id} className="bg-gray-50 p-4 rounded border">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Login Method:</strong> {user.loginMethod}</p>
                      </div>
                      <div>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Phone:</strong> {user.phoneNumber || 'N/A'}</p>
                        <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    {user.loginMethod === 'email' && (
                      <p className="mt-2"><strong>Password:</strong> {user.password} <span className="text-red-500 text-xs">(stored in plain text for demo only)</span></p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No users registered yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside text-yellow-700 space-y-1">
            <li>Go to the <a href="/signup" className="underline">Sign Up page</a> and create an account</li>
            <li>Try signing up with the same email - it should show an error</li>
            <li>Go to the <a href="/signin" className="underline">Sign In page</a> and sign in with your created account</li>
            <li>Try signing in with wrong credentials - it should show an error</li>
            <li>Test social login buttons - they create demo accounts</li>
            <li>Come back here to see all stored accounts and session data</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

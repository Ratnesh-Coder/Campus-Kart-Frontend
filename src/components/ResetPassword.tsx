const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${apiUrl}/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password.');
      }

      setMessage("Your password has been reset successfully! Redirecting to log in...");
      // Redirect to the homepage (where the login modal is) after a short delay
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false); // Stop loading only if there's an error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Choose a New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
          <div>
            <label htmlFor="password-reset" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password-reset"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password-reset" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password-reset"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300">
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
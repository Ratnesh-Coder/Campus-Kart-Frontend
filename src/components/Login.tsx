import { useState } from 'react';
import guitar from "../assets/guitar.png";
import google from "../assets/google.png";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

type PopupProp = {
  setLoginPop: (value: boolean) => void;
};

const Login = (props: PopupProp) => {
  const [formMode, setFormMode] = useState<'options' | 'login' | 'signup'>('options');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); // Get the global login function

  const handleGoogleSignin = () => {
    alert("Google Sign-in backend not connected yet!");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed.');
      
      // Use the global login function
      login(data.user, data.token); 
      
      props.setLoginPop(false); // Close modal on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Sign-up failed.');
      
      alert('Sign-up successful! You can now log in.');
      setFormMode('login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // The rest of the component (renderForm, and the main return) remains unchanged.
  // Make sure it's the same as the code from Step 40.
  const renderForm = () => {
    if (formMode === 'login' || formMode === 'signup') {
      return (
        <form onSubmit={formMode === 'login' ? handleLogin : handleSignUp} className="space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {formMode === 'signup' && (
            <div>
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
          )}
          <div>
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300">
            {isLoading ? 'Processing...' : (formMode === 'login' ? 'Login' : 'Sign Up')}
          </button>
          <button type="button" onClick={() => setFormMode(formMode === 'login' ? 'signup' : 'login')} className="w-full text-center text-sm text-blue-600 hover:underline">
            {formMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </form>
      );
    }
    return (
      <>
        <button onClick={handleGoogleSignin} className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          <img src={google} className="w-5 h-5" alt="Google icon"/>
          <span className="ml-3 font-medium text-gray-700">Continue with Google</span>
        </button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">OR</span></div>
        </div>
        <button onClick={() => setFormMode('login')} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-gray-800 hover:bg-gray-900">
          Continue with Email
        </button>
      </>
    );
  };

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <div className="bg-white p-6">
              <div className="flex justify-end">
                <button onClick={() => props.setLoginPop(false)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="text-center">
                <img src={guitar} className="w-20 h-20 mx-auto" alt="Guitar icon"/>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {formMode === 'signup' ? 'Create Your Account' : 'Welcome to BWU-Kart'}
                </h3>
              </div>
              <div className="mt-8 space-y-4">
                {renderForm()}
              </div>
               <p className="mt-6 text-xs text-center text-gray-500">
                By continuing, you agree to Campus Kart's <a href="#" className="font-medium text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="font-medium text-blue-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
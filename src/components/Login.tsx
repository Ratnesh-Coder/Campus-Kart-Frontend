import { useState } from 'react';
import toast from 'react-hot-toast';
import RebuZZar from "../assets/RebuZZar.png";
import google from "../assets/google.png";
import { useAuth } from '../context/AuthContext';

type PopupProp = {
  setLoginPop: (value: boolean) => void;
};

const Login = (props: PopupProp) => {
  const [formMode, setFormMode] = useState<'options' | 'login' | 'signup' | 'forgot'>('options');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [programName, setProgramName] = useState('');
  const [section, setSection] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleGoogleSignin = () => {
    toast.error("Google Sign-in is not yet implemented.");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed.');

      toast.success('Login successful!');
      login(data.user, data.token);
      props.setLoginPop(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, email, password,
          department, programName, section, rollNumber, studentCode, registrationNumber
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Sign-up failed.');

      toast.success('Sign-up successful! You can now log in.');
      setFormMode('login');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'An error occurred.');
      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    const inputStyle = "w-full px-4 py-2 border border-neutral-400 rounded-md bg-neutral-100 text-neutral-700 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500";

    if (formMode === 'forgot') {
      return (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <p className="text-sm text-center text-neutral-500">Enter your email and we'll send a reset link.</p>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle} required />
          <button type="submit" disabled={isLoading} className="w-full py-2 px-4 rounded-md bg-neutral-700 text-white font-medium hover:bg-neutral-800 disabled:bg-neutral-400">
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <button type="button" onClick={() => setFormMode('login')} className="w-full text-center text-sm text-neutral-700 hover:underline">
            Back to Login
          </button>
        </form>
      );
    }

    if (formMode === 'login' || formMode === 'signup') {
      return (
        <form onSubmit={formMode === 'login' ? handleLogin : handleSignUp} className="space-y-4">
          {formMode === 'signup' && <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className={inputStyle} required />}
          <input type="email" placeholder="University Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={inputStyle} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} required />

          {formMode === 'signup' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputStyle} />
                <input type="text" placeholder="Program Name" value={programName} onChange={(e) => setProgramName(e.target.value)} className={inputStyle} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} className={inputStyle} />
                <input type="text" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className={inputStyle} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Student Code" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} className={inputStyle} />
                <input type="text" placeholder="Registration Number" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} className={inputStyle} />
              </div>
            </>
          )}

          {formMode === 'login' && (
            <div className="text-right text-sm">
              <button type="button" onClick={() => setFormMode('forgot')} className="font-medium text-neutral-700 hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" disabled={isLoading} className="w-full py-2 px-4 rounded-md bg-neutral-700 text-white font-medium hover:bg-neutral-800 disabled:bg-neutral-400">
            {isLoading ? 'Processing...' : formMode === 'login' ? 'Login' : 'Sign Up'}
          </button>

          <button type="button" onClick={() => setFormMode(formMode === 'login' ? 'signup' : 'login')} className="w-full text-center text-sm text-neutral-700 hover:underline">
            {formMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </form>
      );
    }

    return (
      <>
        <button onClick={handleGoogleSignin} className="w-full flex items-center justify-center py-2 px-4 border border-neutral-400 rounded-md bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
          <img src={google} className="w-5 h-5" alt="Google icon"/>
          <span className="ml-3 font-medium">Continue with Google</span>
        </button>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-400"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-neutral-500">OR</span></div>
        </div>
        <button onClick={() => setFormMode('login')} className="w-full py-2 px-4 rounded-md bg-neutral-700 text-white font-medium hover:bg-neutral-800">
          Continue with Email
        </button>
      </>
    );
  };

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="relative transform overflow-hidden rounded-xl bg-neutral-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <div className="bg-neutral-100 p-6">
              <div className="flex justify-end">
                <button onClick={() => props.setLoginPop(false)} className="text-neutral-500 hover:text-neutral-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="text-center">
                <img src={RebuZZar} className="w-20 h-20 mx-auto" alt="RebuZZar logo"/>
                <h3 className="mt-4 text-lg font-semibold text-neutral-700">
                  {formMode === 'signup' ? 'Create Your Account' : formMode === 'forgot' ? 'Reset Password' : 'Welcome to RebuZZar'}
                </h3>
              </div>
              <div className="mt-6 space-y-4">{renderForm()}</div>
              <p className="mt-6 text-xs text-center text-neutral-500">
                By continuing, you agree to RebuZZar's <a href="#" className="font-medium text-neutral-700 hover:underline">Terms of Service</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
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
  const [programType, setProgramType] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [studentCode, setStudentCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleGoogleSignin = () => {
    toast.error("Google Sign-in is not yet implemented.");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
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
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, email, password,
          programType, department, year, studentCode
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
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
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

  // Department options per program
  const departmentOptions: Record<string, string[]> = {
    Diploma: [
      "Allied Health Sciences", "Civil Engineering", "Computer Science & Engineering", 
      "Electronics & Communication Engineering", "Electrical Engineering", 
      "Mechanical Engineering", "Nursing", "Pharmaceutical Technology"

    ],
    UG: [
      "Agriculture", "Allied Health Sciences", "Biotechnology", "Commerce", "Computational Science",
      "Computer Science & Engineering", "Computer Science & Engineering CS & DS", "Computer Science and Engineering AI", 
      "Cyber Science & Technology", "Electrical Engineering", "Electronics & Communication Engineering", 
      "English & Literary Studies", "Food & Nutrition", "Hospital Management", "Law", "Management", 
      "Media Science & Journalism", "Mechanical Engineering", "Multimedia", "Nursing", "Pharmaceutical Technology", "Psychology"

    ],
    PG: [
      "Agriculture", "Allied Health Sciences", "Biotechnology", "Commerce", "Computational Science",
      "Computer Science & Engineering", "Computer Science & Engineering CS & DS", "Computer Science and Engineering AI", 
      "Cyber Science & Technology", "Electronics & Communication Engineering", "English & Literary Studies", 
      "Food & Nutrition", "Hospital Management", "Law", "Management", "Mathematics", "Media Science & Journalism", 
      "Mechanical Engineering", "Multimedia", "Nursing", "Pharmaceutical Technology", "Psychology"

    ],
    PhD: [
      "Biotechnology", "Commerce", "Computational Sciences", "Computer Science & Engineering", 
      "Electronics & Communication Engineering", "English & Literary Studies", "Hospital Management", 
      "Law", "Management", "Mathematics", "Pharmaceutical Technology"
    ]
  };

  const inputStyle =
    "w-full px-4 py-2 border border-neutral-400 rounded-md bg-neutral-100 text-neutral-700 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500";

  const renderForm = () => {
    if (formMode === 'forgot') {
      return (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <p className="text-sm text-center text-neutral-500">Enter your university email to reset password.</p>
          <input
            type="email"
            placeholder="University Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyle}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-md bg-neutral-700 text-white font-medium hover:bg-neutral-800 disabled:bg-neutral-400"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <button
            type="button"
            onClick={() => setFormMode('login')}
            className="w-full text-center text-sm text-neutral-700 hover:underline"
          >
            Back to Login
          </button>
        </form>
      );
    }

    if (formMode === 'login' || formMode === 'signup') {
      return (
        <form onSubmit={formMode === 'login' ? handleLogin : handleSignUp} className="space-y-4">
          {formMode === 'signup' && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputStyle}
                required
              />
              <input
                type="email"
                placeholder="University Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyle}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputStyle}
                required
              />

              {/* Program Type */}
              <Select
                options={[
                  { value: 'Diploma', label: 'Diploma' },
                  { value: 'UG', label: 'Undergraduate (UG)' },
                  { value: 'PG', label: 'Postgraduate (PG)' },
                  { value: 'PhD', label: 'Doctorate (PhD)' },
                ]}
                value={programType ? { value: programType, label: programType } : null}
                onChange={(option) => {
                  setProgramType(option?.value || '');
                  setDepartment('');
                }}
                placeholder="Select Program Type"
                className="w-full"
                classNamePrefix="react-select"
                isSearchable
                menuPlacement="auto"
              />

              {/* Department */}
              {programType && (
                <Select
                  options={departmentOptions[programType].map((dept) => ({ value: dept, label: dept }))}
                  value={department ? { value: department, label: department } : null}
                  onChange={(option) => setDepartment(option?.value || '')}
                  placeholder="Select Department"
                  className="w-full"
                  classNamePrefix="react-select"
                  isSearchable
                  menuPlacement="auto"
                />
              )}

              {/* Year */}
              <Select
                options={[
                  { value: '1st', label: '1st Year' },
                  { value: '2nd', label: '2nd Year' },
                  { value: '3rd', label: '3rd Year' },
                  { value: '4th', label: '4th Year' },
                  { value: '5th', label: '5th Year' },
                ]}
                value={year ? { value: year, label: year } : null}
                onChange={(option) => setYear(option?.value || '')}
                placeholder="Select Year"
                className="w-full"
                classNamePrefix="react-select"
                isSearchable
                menuPlacement="auto"
              />

              {/* Student Code optional */}
              <input
                type="text"
                placeholder="Student Code"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                className={inputStyle}
              />
            </>
          )}

          {formMode === 'login' && (
            <>
              <input
                type="email"
                placeholder="University Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyle}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputStyle}
                required
              />
              <div className="text-right text-sm">
                <button
                  type="button"
                  onClick={() => setFormMode('forgot')}
                  className="font-medium text-neutral-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-md bg-neutral-700 text-white font-medium hover:bg-neutral-800 disabled:bg-neutral-400"
          >
            {isLoading ? 'Processing...' : formMode === 'login' ? 'Login' : 'Sign Up'}
          </button>

          <button
            type="button"
            onClick={() => setFormMode(formMode === 'login' ? 'signup' : 'login')}
            className="w-full text-center text-sm text-neutral-700 hover:underline"
          >
            {formMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </form>
      );
    }

    return (
      <>
        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center py-2 px-4 border border-neutral-400 rounded-md bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
        >
          <img src={google} className="w-5 h-5" alt="Google icon" />
          <span className="ml-3 font-medium">Continue with Google</span>
        </button>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-400"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">OR</span>
          </div>
        </div>
        <button
          onClick={() => setFormMode('login')}
          className="w-full py-2 px-4 rounded-md bg-neutral-700 text-white font-medium hover:bg-neutral-800"
        >
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
          <div className="relative transform overflow-hidden rounded-2xl bg-neutral-100 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <div className="bg-neutral-100 p-6">
              <div className="flex justify-end">
                <button
                  onClick={() => props.setLoginPop(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-center">
                <img src={RebuZZar} className="w-20 h-20 mx-auto" alt="RebuZZar logo" />
                <h3 className="mt-4 text-lg font-semibold text-neutral-700">
                  {formMode === 'signup'
                    ? 'Create Your Student Account'
                    : formMode === 'forgot'
                    ? 'Reset Password'
                    : 'Welcome to RebuZZar'}
                </h3>
              </div>
              <div className="mt-6 space-y-4">{renderForm()}</div>
              <p className="mt-6 text-xs text-center text-neutral-500">
                By continuing, you agree to RebuZZar's{' '}
                <a href="#" className="font-medium text-neutral-700 hover:underline">
                  Terms of Service
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

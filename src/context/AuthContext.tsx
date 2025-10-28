import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { logError } from '../utils/logError';

// Define the shape of the user object
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'admin';
  // New University Fields
  studentCode?: string;
  programType?: 'Diploma' | 'UG' | 'PG' | 'PhD';
  department?: string;
  year?: '1st' | '2nd' | '3rd' | '4th' | '5th';
}

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On initial load, check local storage for existing session
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      logError("Failed to parse auth user from local storage", error);
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
    } finally {
      // This ensures loading is set to false after the check is done.
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('authUser', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  };

  // --- THIS IS THE MISSING FUNCTION ---
  const updateUser = (userData: User) => {
    setUser(userData); // Update the user in the component's state
    localStorage.setItem('authUser', JSON.stringify(userData)); // Update the user in local storage
  };
  // ------------------------------------

console.log("AuthProvider providing:", { user, isLoading });

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const { user, token, updateUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    programName: '',
    section: '',
    rollNumber: '',
    studentCode: '',
    registrationNumber: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        department: user.department || '',
        programName: user.programName || '',
        section: user.section || '',
        rollNumber: user.rollNumber || '',
        studentCode: user.studentCode || '',
        registrationNumber: user.registrationNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/profile`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
      });

      const updatedUserData = await response.json();
      if (!response.ok) {
          throw new Error(updatedUserData.message || 'Failed to update profile.');
      }

      updateUser(updatedUserData);
      toast.success('Profile updated successfully!');
      navigate('/profile');

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-neutral-700">You must be logged in to edit your profile.</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">Go to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-neutral-50 rounded-xl shadow-lg border border-neutral-200 mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-neutral-700">Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-neutral-700"
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-neutral-700">Department</label>
            <input 
              type="text" 
              id="department" 
              name="department" 
              value={formData.department} 
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-neutral-700"
              placeholder="Computer Science"
            />
          </div>
          <div>
            <label htmlFor="programName" className="block text-sm font-medium text-neutral-700">Program Name</label>
            <input 
              type="text" 
              id="programName" 
              name="programName" 
              value={formData.programName} 
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-neutral-700"
              placeholder="B.Tech"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="section" className="block text-sm font-medium text-neutral-700">Section</label>
            <input 
              type="text" 
              id="section" 
              name="section" 
              value={formData.section} 
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-neutral-700"
              placeholder="A1"
            />
          </div>
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-neutral-700">Roll Number</label>
            <input 
              type="text" 
              id="rollNumber" 
              name="rollNumber" 
              value={formData.rollNumber} 
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-neutral-700"
              placeholder="CS2021001"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="studentCode" className="block text-sm font-medium text-neutral-700">Student Code</label>
            <input 
              type="text" 
              id="studentCode" 
              name="studentCode" 
              value={formData.studentCode} 
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-neutral-700"
              placeholder="STU12345"
            />
          </div>
          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-neutral-700">Registration Number</label>
            <input 
              type="text" 
              id="registrationNumber" 
              name="registrationNumber" 
              value={formData.registrationNumber} 
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-neutral-700"
              placeholder="REG202101"
            />
          </div>
        </div>
        
        <div className="flex gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/profile')} 
              className="w-full flex justify-center py-3 px-4 rounded-lg shadow font-medium text-neutral-700 bg-neutral-200 hover:bg-neutral-300 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full flex justify-center py-3 px-4 rounded-lg shadow font-medium text-white bg-neutral-700 hover:bg-neutral-800 disabled:bg-neutral-500 transition"            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
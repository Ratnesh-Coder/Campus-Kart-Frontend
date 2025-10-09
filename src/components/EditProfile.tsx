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

  // This effect pre-fills the form with the current user's data when the component loads
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

  // This is the correct handleSubmit function
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

      // Update the global user state with the new data
      updateUser(updatedUserData);
      
      toast.success('Profile updated successfully!');
      navigate('/profile');

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }; // The function correctly ends here

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">You must be logged in to edit your profile.</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">Go to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required/>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <input type="text" id="department" name="department" value={formData.department} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label htmlFor="programName" className="block text-sm font-medium text-gray-700">Program Name</label>
            <input type="text" id="programName" name="programName" value={formData.programName} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section</label>
            <input type="text" id="section" name="section" value={formData.section} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input type="text" id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="studentCode" className="block text-sm font-medium text-gray-700">Student Code</label>
            <input type="text" id="studentCode" name="studentCode" value={formData.studentCode} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input type="text" id="registrationNumber" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
        </div>
        
        <div className="flex gap-4">
            <button type="button" onClick={() => navigate('/profile')} className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
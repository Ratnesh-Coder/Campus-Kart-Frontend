import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import EmptyStateIcon from './EmptyStateIcon';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, token, updateUser } = useAuth();
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!user || !token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/api/profile/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch your products');
        const data: Product[] = await response.json();
        setUserProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProducts();
  }, [user, token]);

  const handleDelete = async (productId: string) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete product.');
      setUserProducts(prev => prev.filter(p => p._id !== productId));
      toast.success('Item deleted successfully!');
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const uploadToast = toast.loading('Uploading avatar...');
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('http://localhost:5000/api/profile/avatar', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const updatedUserData = await response.json();
      if (!response.ok) throw new Error(updatedUserData.message || 'Failed to upload avatar.');

      updateUser(updatedUserData);
      toast.success('Avatar updated successfully!', { id: uploadToast });
    } catch (err: any) {
      toast.error(`Error: ${err.message}`, { id: uploadToast });
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-white text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Access Denied 🚫</h2>
        <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
        <Link
          to="/"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-md"
        >
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative backdrop-blur-xl bg-white/70 border border-indigo-200 rounded-3xl p-8 shadow-lg"
        >
          <div className="relative flex flex-col sm:flex-row items-center sm:justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {/* Avatar as clickable element */}
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => avatarInputRef.current?.click()}
                  className="h-28 w-28 rounded-full ring-4 ring-indigo-300 shadow-lg object-cover cursor-pointer transition-all duration-300"
                  src={user.avatar || 'https://via.placeholder.com/150'}
                  alt="User Avatar"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={avatarInputRef}
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <Link
              to="/edit-profile"
              className="mt-6 sm:mt-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
            >
              Edit Profile
            </Link>
          </div>
        </motion.div>

        {/* University Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/70 border border-indigo-200 rounded-3xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-indigo-200 pb-3">
            University Information 🎓
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6">
            {[
              { label: 'Department', value: user.department },
              { label: 'Program', value: user.programName },
              { label: 'Section', value: user.section },
              { label: 'Roll No.', value: user.rollNumber },
              { label: 'Student Code', value: user.studentCode },
              { label: 'Reg. Number', value: user.registrationNumber },
            ]
              .filter(info => info.value)
              .map(info => (
                <div key={info.label}>
                  <dt className="text-sm text-gray-500">{info.label}</dt>
                  <dd className="font-semibold text-gray-900">{info.value}</dd>
                </div>
              ))}
          </dl>
        </motion.div>

        {/* Listings */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Active Listings 🛒</h2>

          {loading ? (
            <p className="text-center text-gray-500 animate-pulse">Loading your items...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : userProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {userProducts.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="group backdrop-blur-xl bg-white/70 border border-indigo-200 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Link to={`/product/${item._id}`}>
                    <div className="aspect-video rounded-t-3xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">{item.title}</h3>
                    <p className="text-xl font-bold text-indigo-600">₹{item.price.toLocaleString()}</p>
                    <div className="flex gap-3">
                      <Link to={`/edit-product/${item._id}`} className="flex-1">
                        <button className="w-full bg-indigo-500 text-white text-sm py-2.5 rounded-lg hover:bg-indigo-600 transition">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex-1 bg-red-500 text-white text-sm py-2.5 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 backdrop-blur-xl bg-white/70 border border-indigo-200 rounded-3xl shadow-sm">
              <EmptyStateIcon />
              <h3 className="mt-4 text-2xl font-semibold text-gray-900">You have no active listings</h3>
              <p className="mt-1 text-gray-500">When you post an item, it will show up here.</p>
              <Link
                to="/sell"
                className="inline-block mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md"
              >
                Sell Your First Item
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default Profile;

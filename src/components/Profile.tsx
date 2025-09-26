import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product } from './Main'; // Reuse the Product interface
import { Link } from 'react-router-dom';
import EmptyStateIcon from './EmptyStateIcon'; // Reuse the empty state icon

const Profile = () => {
  const { user } = useAuth();
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const allProducts: Product[] = await response.json();

        // --- FIX IS HERE: Filter by user._id instead of user.id ---
        const currentUserProducts = allProducts.filter(product => product.sellerId === user._id);

        setUserProducts(currentUserProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
        fetchUserProducts();
    } else {
        setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Go to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img className="h-24 w-24 rounded-full" src={user.avatar || 'https://via.placeholder.com/150'} alt="User Avatar" />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* User's Listings Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Active Listings</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading your items...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : userProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userProducts.map(item => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                   <div className="w-full aspect-video overflow-hidden bg-gray-200 flex items-center justify-center">
                      <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                   </div>
                  <div className="p-4">
                    <h3 className="font-semibold truncate text-lg text-gray-800">{item.title}</h3>
                    <p className="text-gray-900 font-bold text-xl mt-1">₹{item.price.toLocaleString()}</p>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-blue-500 text-white text-sm py-2 rounded hover:bg-blue-600 font-semibold">Edit</button>
                      <button className="flex-1 bg-red-500 text-white text-sm py-2 rounded hover:bg-red-600 font-semibold">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white rounded-lg shadow-sm">
               <EmptyStateIcon />
               <h3 className="mt-2 text-xl font-semibold text-gray-900">You have no active listings</h3>
               <p className="mt-1 text-sm text-gray-500">When you post an item, it will show up here.</p>
               <div className="mt-6">
                 <Link to="/sell" className="bg-blue-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition">
                   Sell Your First Item
                 </Link>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
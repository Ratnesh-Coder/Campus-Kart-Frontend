import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the global auth hook

const Profile = () => {
  const { user } = useAuth(); // Get the currently logged-in user

  // This is placeholder data for listings. We will fetch this from the backend later.
  const userListings = []; 

  if (!user) {
    // If no user is found in the global context, show the login prompt
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">Please Log In</h2>
        <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
        {/* This button should now take the user to the login modal */}
        <p className="text-gray-600">
          Go back to the <Link to="/" className="text-blue-600 hover:underline">Homepage</Link> to log in.
        </p>
      </div>
    );
  }

  // If a user IS found, show their profile
  const hasListings = userListings.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center space-x-6">
          <img className="h-24 w-24 rounded-full" src={user.avatar || 'https://via.placeholder.com/150'} alt="User Avatar" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* User's Listings Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Active Listings</h2>
          {hasListings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* We will map over real listings here in a future step */}
            </div>
          ) : (
            // Empty State for Listings
            <div className="text-center py-16 px-4 bg-white rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
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
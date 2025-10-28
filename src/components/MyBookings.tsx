const apiUrl = import.meta.env.VITE_API_URL;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// Define the structure of the data we expect from the API
interface ProductInfo {
  productId: {
    _id: string;
    title: string;
    imageUrl: string[];
  };
  quantity: number;
  price: number;
}

interface Booking {
  _id: string;
  totalPrice: number;
  status: string;
  bookingDate: string; // Dates will come as ISO strings
  products: ProductInfo[];
}


const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("You must be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/api/bookings/my-bookings`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings.');
        }

        const data = await response.json();
        setBookings(data);

      } catch (error) {
        toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // The empty array ensures this effect runs only once

  if (loading) {
    return <div className="text-center py-20">Loading your bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">No Bookings Yet</h2>
        <p className="text-gray-600 mb-8">You haven't booked any items. Let's change that!</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Bookings</h1>
      <div className="space-y-8">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <div>
                <p className="text-sm text-gray-500">Booking ID: {booking._id}</p>
                <p className="font-semibold">
                  Date: {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">Total: ₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                <span className="text-sm font-medium text-white bg-blue-500 px-3 py-1 rounded-full">
                  {booking.status}
                </span>
              </div>
            </div>
            
            <h3 className="font-bold text-lg mb-4">Items in this booking:</h3>
            <div className="space-y-4">
              {booking.products.map(item => (
                <div key={item.productId._id} className="flex items-center">
                   <img 
                    src={item.productId.imageUrl[0]} 
                    alt={item.productId.title} 
                    className="w-16 h-16 object-contain rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.productId.title}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
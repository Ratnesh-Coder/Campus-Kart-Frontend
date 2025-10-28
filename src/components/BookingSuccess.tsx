import { Link } from 'react-router-dom';

const BookingSuccess = () => {
  return (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed! ✅</h2>
      <p className="text-gray-600 mb-8">
        Thank you! The seller has been notified. We will contact you shortly to arrange delivery.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default BookingSuccess;
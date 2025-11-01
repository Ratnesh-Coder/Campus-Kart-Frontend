import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  totalPrice: number;
  status: string;
  products: {
    productId: {
      _id: string;
      title: string;
      price: number;
      imageUrl?: string[];
    };
    quantity: number;
  }[];
}

const BookingSuccess = () => {
  const location = useLocation();
  const bookingId = location.state?.bookingId;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setError("No booking ID provided.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch booking");

        setBooking(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  return (
    <div className="text-center py-20 px-4">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Booking Confirmed! ✅
      </h2>
      <p className="text-gray-600 mb-8">
        Thank you! The seller has been notified. We will contact you shortly to
        arrange delivery.
      </p>

      {loading && <p className="text-gray-500">Loading booking details...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {booking && (
        <div className="max-w-2xl mx-auto mt-8 border rounded-lg shadow-md p-6 bg-white text-left">
          <h3 className="text-2xl font-semibold mb-4">Your Booking Details</h3>
          <p className="text-gray-700 mb-2">
            <strong>Booking ID:</strong> {booking._id}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Status:</strong> {booking.status}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Total Price:</strong> ₹{booking.totalPrice}
          </p>

          <div className="space-y-4">
            {booking.products.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center border rounded-md p-3"
              >
                <img
                  src={
                    item.productId.imageUrl?.[0] ||
                    "https://via.placeholder.com/100"
                  }
                  alt={item.productId.title}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold">
                    {item.productId.title}
                  </h4>
                  <p className="text-gray-600">
                    ₹{item.productId.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link
          to="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default BookingSuccess;

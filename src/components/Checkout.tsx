const apiUrl = import.meta.env.VITE_API_URL;
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// --- Helper Icon Component (kept as-is) ---
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const Checkout = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  // ✅ Handle booking (unchanged)
  const handleBooking = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to proceed.');
      return navigate('/login');
    }

    const bookingData = {
      products: cartItems.map((item) => ({
        productId: item.productId?.toString(),
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
    };

    try {
      const res = await fetch(`${apiUrl}/api/bookings/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking failed');

      toast.success('Booking successful! ✅');
      clearCart();
      navigate('/booking-success');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  // --- EMPTY CART VIEW (unchanged) ---
  if (cartItems.length === 0) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center p-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-neutral-600 mb-8 max-w-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="bg-neutral-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors shadow-lg hover:shadow-neutral-400/50"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // --- MAIN CHECKOUT VIEW ---
  // ✅ Desktop layout changed to single-column (like Code 1)
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 mt-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-800 mb-8 text-center">
          Your Shopping Cart
        </h1>

        {/* ✅ CART ITEMS - Stacked vertically (single column layout) */}
        <div className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <div
              key={item.productId?.toString()}
              className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-sm border border-neutral-200"
            >
              {/* Image */}
              <img
                src={item.imageUrl?.[0] || 'https://placehold.co/96x96/e2e8f0/64748b?text=Image'}
                alt={item.title}
                className="w-24 h-24 rounded-md object-cover mb-4 sm:mb-0 sm:mr-6"
                onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/96x96/e2e8f0/64748b?text=Image')}
              />

              {/* Item Info */}
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-semibold text-neutral-800 text-base sm:text-lg truncate">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base mt-1">
                  ₹{item.price}
                </p>
              </div>

              {/* Quantity + Remove */}
              <div className="flex items-center gap-4 mt-3 sm:mt-0">
                <button
                  onClick={() => decreaseQuantity(item.productId?.toString())}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800 transition-all"
                >
                  -
                </button>
                <span className="w-8 text-center text-base font-medium text-neutral-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.productId?.toString())}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800 transition-all"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.productId?.toString())}
                  className="text-sm font-medium text-red-500 hover:text-red-700 transition-all flex items-center gap-1"
                >
                  <TrashIcon /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ ORDER SUMMARY - Centered below the list */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h2 className="text-2xl font-semibold text-center mb-4 tracking-wide">Your Order Summary</h2>
          <p className="text-gray-500 text-sm text-center mb-6 italic">
            Excellence is just a click away — confirm your booking and we’ll handle the rest.
          </p>
          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>₹1000</span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-3">
            <span>Total</span>
            <span>₹1000</span>
          </div>
          <p className="text-xs text-gray-400 text-center mt-5">
            By placing this booking, you agree to our terms & cancellation policies.
          </p>
          <button
            onClick={handleBooking}
            className="w-full mt-6 bg-neutral-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-neutral-800 transition-colors shadow-lg hover:shadow-neutral-400/50"
          >
            Place Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

const apiUrl = import.meta.env.VITE_API_URL;
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // ✅ Handle booking
  const handleBooking = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error("Please login to proceed.");
      return navigate('/login');
    }

    const bookingData = {
      products: cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice
    };

    try {
      const res = await fetch(`${apiUrl}/api/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      toast.success("Booking successful! ✅");
      clearCart();
      navigate("/booking-success");

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-md">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Your Shopping Cart</h1>

      {cartItems.map(item => (
        <div key={item._id} className="flex items-center bg-white p-4 rounded-lg shadow-md mb-6">
          <img src={item.imageUrl[0]} className="w-24 h-24 mr-6" />
          <div className="flex-grow">
            <h3 className="font-bold">{item.title}</h3>
            <p>₹{item.price}</p>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => decreaseQuantity(item._id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item._id)}>+</button>
          </div>

          <button onClick={() => removeFromCart(item._id)} className="ml-8 text-red-500">
            Remove
          </button>
        </div>
      ))}

      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        {/* ✅ Booking Button triggers backend */}
        <button
          onClick={handleBooking}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition"
        >
          Place Booking
        </button>
      </div>
    </div>
  );
};

export default Checkout;


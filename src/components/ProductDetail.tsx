import { useState, useEffect, TouchEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { logError } from '../utils/logError';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false); // Added fullscreen state
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // ✅ Related Products State
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Swipe gestures
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const images = product?.images && product.images.length > 0 ? product.images : [product?.imageUrl];

    if (distance > minSwipeDistance) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    } else if (distance < -minSwipeDistance) {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // ✅ Fetch selected product
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error('Product not found.');
          throw new Error('Failed to fetch product details.');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        logError('Fetching product details failed', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // ✅ Fetch related products after product loaded
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.category) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/products/category/${product.category}`
        );

        if (response.ok) {
          const data: Product[] = await response.json();
          const filtered = data.filter((p) => p._id !== product._id);
          setRelatedProducts(filtered.slice(0, 10));
        }
      } catch (err) {
        console.error("Related product fetch failed:", err);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  // ✅ Buy Now handler
  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product);
    navigate('/checkout');
  };

  if (loading) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-gray-700">Loading Product...</h2>
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-red-600">Error: {error}</h2>
      <p className="text-gray-600 mt-4">
        Please try again later or go back to the{" "}
        <Link to="/" className="text-blue-600 hover:underline">homepage</Link>.
      </p>
    </div>
  );

  if (!product) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-gray-700">Product Not Found</h2>
      <p className="text-gray-600 mt-4">The item you are looking for does not exist or has been removed.</p>
      <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
        Browse All Items
      </Link>
    </div>
  );

  // const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  const images = product.imageUrl || [];

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* ✅ Improved Product Image Viewer */}
          <div
            className="relative group bg-neutral-100 rounded-2xl overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >

            {/* Main Image */}
            <img
              src={images[currentImage]}
              alt={`${product.title}-${currentImage}`}
              onClick={() => setFullscreen(true)}
              className="w-full aspect-square object-contain cursor-zoom-in transition-all duration-300"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                  className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full items-center justify-center"
                >
                  ❮
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                  className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full items-center justify-center"
                >
                  ❯
                </button>
              </>
            )}

            {/* Thumbnail Preview */}
            <div className="flex justify-center gap-2 p-3">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setCurrentImage(idx)}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-16 h-16 object-cover rounded-md border cursor-pointer transition ${
                    idx === currentImage ? "border-blue-600 scale-105" : "opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ✅ Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.title}</h1>
              <p className="text-green-600 text-3xl font-bold mb-6">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <div className="mb-6 text-gray-700">
                <p className="text-lg font-semibold mb-2">Description:</p>
                <p className="text-base leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <span className="font-medium mr-2">Category:</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <div className="text-sm text-gray-500 mb-8">
                Posted on {new Date(product.postDate).toLocaleDateString()}
              </div>
            </div>

            {/* ✅ Desktop Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-green-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-600 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-600 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Related Products</h2>

            <div className="flex gap-4 overflow-x-auto pb-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="min-w-[160px] bg-gray-100 p-3 rounded-lg hover:shadow transition"
                >
                  <img
                    src={item.imageUrl[0]}
                    className="w-full h-28 object-cover rounded"
                    alt={item.title}
                  />
                  <p className="mt-2 text-sm font-semibold line-clamp-1">{item.title}</p>
                  <p className="text-sm">₹{item.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to all products
          </Link>
        </div>
      </div>

      {/* ✅ Fullscreen Modal */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50"
          onClick={() => setFullscreen(false)}
        >
          <img
            src={images[currentImage]}
            className="max-w-full max-h-full object-contain cursor-zoom-out"
            alt={`Fullscreen ${product.title}`}
          />
        </div>
      )}

      {/* ✅ Sticky Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-3 flex justify-between items-center md:hidden z-50 border-t">
        <button
          onClick={() => addToCart(product)}
          className="px-4 py-2 border rounded-lg font-semibold"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

export default ProductDetail;
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { logError } from '../utils/logError';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          // If product not found (e.g., 404), throw a specific error
          if (response.status === 404) {
            throw new Error('Product not found.');
          }
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
  }, [productId]); // Re-fetch if productId in URL changes

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">Loading Product...</h2>
        {/* You could add a spinner here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-600">Error: {error}</h2>
        <p className="text-gray-600 mt-4">Please try again later or go back to the <Link to="/" className="text-blue-600 hover:underline">homepage</Link>.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">Product Not Found</h2>
        <p className="text-gray-600 mt-4">The item you are looking for does not exist or has been removed.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Browse All Items
        </Link>
      </div>
    );
  }

  // If product is loaded successfully, display its details
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden p-4">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="max-w-full max-h-96 object-contain"
          />
        </div>

        {/* Product Details */}
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
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{product.category}</span>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            Posted on {new Date(product.postDate).toLocaleDateString()} {/* Assuming postDate exists */}
            {/* You could also fetch seller details here if needed, but not in this basic version */}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-600 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Add to Cart (Coming Soon)
            </button>
            <button className="flex-1 border border-blue-500 text-blue-500 py-3 px-6 rounded-md font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              Chat with Seller (Coming Soon)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to all products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
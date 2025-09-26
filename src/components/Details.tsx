import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "./Main";

const Details = () => {
  const { id } = useParams<{ id: string }>(); // This now correctly matches the route
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`); // Use id here
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // The dependency is now id

  if (loading) {
    return <div className="text-center py-20 font-semibold">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the product you're looking for.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-96 object-contain rounded-md"
            />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</h3>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{product.title}</h1>
            <div className="mt-4">
              <p className="text-4xl font-bold text-blue-600">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800">Description</h2>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {product.description || "No description provided."}
              </p>
            </div>
            <div className="mt-8">
                <button className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition">
                    Contact Seller
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
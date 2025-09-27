import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "./Main";

// New: Define a type for the seller's public info
interface Seller {
  name: string;
  email: string;
}

const Details = () => {
  const { id } = useParams<{ id: string }>(); // Changed to 'id' to match router
  const [product, setProduct] = useState<Product | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null); // New state for seller info
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductAndSeller = async () => {
      try {
        if (!id) {
            throw new Error("Product ID not found in URL.");
        }
        // Step 1: Fetch the product details
        const productResponse = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!productResponse.ok) {
          throw new Error('Product not found');
        }
        const productData: Product = await productResponse.json();
        setProduct(productData);

        // Step 2: Fetch the seller's details using the sellerId from the product
        if (productData.sellerId) {
          const sellerResponse = await fetch(`http://localhost:5000/api/users/${productData.sellerId}`);
          if (!sellerResponse.ok) {
              throw new Error('Could not fetch seller information.');
          }
          const sellerData: Seller = await sellerResponse.json();
          setSeller(sellerData);
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndSeller();
  }, [id]);

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

            {/* New: Display Seller Information */}
            {seller && (
                <div className="mt-8 border-t pt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Seller Information</h2>
                    <p className="mt-2 text-gray-600">
                        <strong>Name:</strong> {seller.name}
                    </p>
                    <a href={`mailto:${seller.email}?subject=Inquiry about ${product.title}`}
                       className="mt-4 w-full inline-block text-center bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition">
                       Contact Seller
                    </a>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
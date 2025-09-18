import { Link } from "react-router-dom";
import { Product } from "./Main";
import EmptyStateIcon from "./EmptyStateIcon";

type HomeProps = {
  products: Product[];
  search: string;
  menu: string;
  loading: boolean;
  error: string | null;
};

const Home = ({ products, search, menu, loading, error }: HomeProps) => {
  const filteredProducts = products.filter((data) =>
    data?.title?.toLowerCase().includes((search || menu || "").toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-10 font-semibold text-gray-500">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600 font-semibold">Could not connect to the backend. Please make sure it's running.</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-50 text-center py-12 px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Welcome to Campus Kart
        </h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-gray-600">
          The official marketplace to buy and sell used educational items right here on campus.
        </p>
        <Link
          to="/sell"
          className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Start Selling Today
        </Link>
      </div>

      {/* Products Grid or Empty State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
            {filteredProducts.map((data) => (
              <Link to={`/product/${data.id}`} key={data.id}>
                 <div className="border rounded-lg shadow p-4 hover:shadow-lg transition-transform transform hover:-translate-y-1">
                    <img
                      src={data?.image}
                      className="w-full h-48 object-cover mb-4 rounded-md"
                      alt={data?.title}
                    />
                    <h2 className="font-bold text-lg truncate mb-1">
                      {data?.title}
                    </h2>
                    <p className="text-xl font-semibold text-gray-800 mb-2">
                      ₹{data?.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      Category: {data?.category}
                    </p>
                    <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-semibold">
                      View Details
                    </button>
                  </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white mt-8 rounded-lg">
            <EmptyStateIcon />
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">It's a bit empty in here</h2>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">Why not be the first to sell something? Your old textbooks or calculators could be just what someone else is looking for.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
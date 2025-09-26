import { Link } from "react-router-dom";
import { Product } from "./Main";
import EmptyStateIcon from "./EmptyStateIcon";

type HomeProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const Home = ({ products, loading, error }: HomeProps) => {
  if (loading) {
    return <div className="text-center p-10 font-semibold text-gray-500">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600 font-semibold">Could not connect to the backend. Please make sure it's running.</div>;
  }

  return (
    <>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
            {products.map((data) => (
              <Link to={`/product/${data._id}`} key={data._id} className="group">
                 <div className="h-full flex flex-col border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white">
                    <div className="w-full aspect-video overflow-hidden bg-gray-200 flex items-center justify-center rounded-t-lg">
                        <img
                          src={data.imageUrl}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          alt={data.title}
                        />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                        <h2 className="font-bold text-lg truncate mb-1 text-gray-800">
                          {data.title}
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">
                          {data.category}
                        </p>
                        <p className="text-xl font-semibold text-gray-900 mb-4">
                          ₹{data.price.toLocaleString("en-IN")}
                        </p>
                        <div className="flex-grow"></div>
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-semibold transition-colors">
                          View Details
                        </button>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white mt-8 rounded-lg">
            <EmptyStateIcon />
            <h2 className="mt-6 text-2xl font-semibold text-gray-900">No items match your search.</h2>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">Try a different category or clear your search to see all available items.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
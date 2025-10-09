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
    return <div className="text-center p-10 font-semibold text-neutral-500">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600 font-semibold">Could not connect to the backend. Please make sure it's running.</div>;
  }

  return (
    <>
      <div className="bg-neutral-800 text-white text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          The Student Marketplace
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-neutral-300">
          Buy and sell textbooks, electronics, and more, exclusively within your university community.
        </p>
        <Link
          to="/sell"
          className="mt-8 inline-block bg-secondary text-white px-8 py-3 rounded-full font-bold text-lg transition-transform hover:scale-105">
          Start Selling Today
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
            {products.map((data) => (
              <Link to={`/product/${data._id}`} key={data._id} className="group">
                {/* Product Card */}
                 <div className="h-full flex flex-col border rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden">
                    <div className="w-full h-48 overflow-hidden bg-neutral-200 flex items-center justify-center">
                        <img
                          src={data.imageUrl}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          alt={data.title}
                        />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                        <h2 className="font-bold text-lg truncate mb-1 text-neutral-800 group-hover:text-black">
                          {data.title}
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">
                          {data.category}
                        </p>
                        <p className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-black transition-colors">
                          ₹{data.price.toLocaleString("en-IN")}
                        </p>
                        <div className="flex-grow"></div>
                        <button className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition-colors">
                          View Details
                        </button>
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white mt-8 rounded-lg shadow-sm">
            <EmptyStateIcon />
            <h2 className="mt-6 text-2xl font-semibold text-neutral-900">No Items Found</h2>
            <p className="mt-2 text-neutral-600 max-w-md mx-auto">It looks like no items match your current search or filter. Try a different category or clear your search!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
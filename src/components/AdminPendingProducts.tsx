const apiUrl = import.meta.env.VITE_API_URL;
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Slider from "react-slick";
import { useAuth } from '../context/AuthContext';
import { logError } from '../utils/logError';

// --- Helper Modal Component (with Navigation Logic) ---
interface ImageModalProps {
  imageUrls: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}
const ImageModal: React.FC<ImageModalProps> = ({ imageUrls, currentIndex, onClose, onNavigate }) => {
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    onNavigate(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    onNavigate(prevIndex);
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div onClick={(e) => e.stopPropagation()} className="relative flex items-center justify-center w-full h-full p-4">
        
        {/* Left Arrow */}
        <button onClick={handlePrev} className="absolute left-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="relative bg-white rounded-lg max-w-4xl max-h-[90vh]">
          <img src={imageUrls[currentIndex]} alt="Enlarged product view" className="max-w-full max-h-full object-contain" style={{ maxHeight: 'calc(90vh - 2rem)' }} />
        </div>
        
        {/* Right Arrow */}
        <button onClick={handleNext} className="absolute right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        <button onClick={onClose} className="absolute top-4 right-4 bg-white rounded-full p-1 text-gray-800 hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
      </div>
    </div>
  );
};

// --- Main Admin Dashboard Component ---
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string[];
  sellerId: { name: string; email: string; };
}
const AdminPendingProducts: React.FC = () => {
  const { token } = useAuth();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [modalState, setModalState] = React.useState<{ product: Product, currentIndex: number } | null>(null);

  const sliderSettings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, arrows: false };

  React.useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        const res = await axios.get<Product[]>(`${apiUrl}/api/admin/products/pending`, { headers: { Authorization: `Bearer ${token}` } });
        setProducts(res.data);
      } catch (err) {
        logError('GET /api/admin/products/pending failed', err);
        toast.error('Failed to fetch pending products.');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchPendingProducts();
  }, [token]);

  const updateStatus = async (productId: string, status: 'approved' | 'rejected') => {
    try {
      await axios.put(`${apiUrl}/api/admin/products/${productId}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(`Product ${status} successfully.`);
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      logError('PUT /api/admin/products/:id/status failed', err);
      toast.error('Failed to update status.');
    }
  };

  if (loading) return <div className="text-center py-20">Loading pending products...</div>;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 mt-10 min-h-screen">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Pending Product Approvals</h1>
        
        {products.length === 0 ? (
          <p className="text-gray-500 bg-white p-8 text-center rounded-lg shadow-md">No products are currently pending approval. ✨</p>
        ) : (
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-6 rounded-lg shadow-md border grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <div className="flex items-center justify-center">
                   {product.imageUrl.length > 1 ? (
                      <div className="w-full">
                        <Slider {...sliderSettings}>
                          {product.imageUrl.map((url, index) => (
                            <div key={index}>
                              <img src={url} alt={`${product.title} ${index + 1}`} className="w-32 h-32 object-contain rounded-md mx-auto cursor-pointer hover:opacity-80 transition" onClick={() => setModalState({ product, currentIndex: index })} />
                            </div>
                          ))}
                        </Slider>
                      </div>
                    ) : (
                      <img src={product.imageUrl[0]} alt={product.title} className="w-32 h-32 object-contain rounded-md cursor-pointer hover:opacity-80 transition" onClick={() => setModalState({ product, currentIndex: 0 })} />
                    )}
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="text-gray-800 font-semibold mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-gray-500 mt-1 capitalize">Category: {product.category}</p>
                  <p className="text-sm text-gray-700 mt-3">{product.description}</p>
                  <div className="mt-4 pt-4 border-t"><p className="text-sm font-semibold">Seller: {product.sellerId.name}</p><p className="text-xs text-gray-500">{product.sellerId.email}</p></div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  <button onClick={() => updateStatus(product._id, 'approved')} className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 font-semibold transition-colors">Approve</button>
                  <button onClick={() => updateStatus(product._id, 'rejected')} className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold transition-colors">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalState && (
        <ImageModal 
          imageUrls={modalState.product.imageUrl}
          currentIndex={modalState.currentIndex}
          onClose={() => setModalState(null)}
          onNavigate={(newIndex) => setModalState({ ...modalState, currentIndex: newIndex })}
        />
      )}
    </>
  );
};

export default AdminPendingProducts;
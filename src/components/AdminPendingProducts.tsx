import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { logError } from '../utils/logError';


// Type for Product
interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  sellerId: {
    name: string;
    email: string;
  };
}

const AdminPendingProducts: React.FC = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchPendingProducts = async () => {
    try {
      const res = await axios.get<Product[]>(`http://localhost:5000/api/admin/products/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      logError('GET /api/admin/products/pending failed', err);
      toast.error('Failed to fetch pending products.');

    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const updateStatus = async (productId: string, status: 'approved' | 'rejected') => {
    try {
      await axios.put(
        `/api/admin/products/${productId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Product ${status} successfully.`);
      setProducts(products.filter(p => p._id !== productId)); // remove approved/rejected
    } catch (err) {
      logError('PUT /api/admin/products/:id/status failed', err);
      toast.error('Failed to update status.');
    }
  };

  if (!products.length) return <p>No pending products.</p>;

  return (
    <div>
      <h1>Pending Products</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Title</th>
            <th>Seller</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} className="border-t">
              <td>{product.title}</td>
              <td>{product.sellerId.name} ({product.sellerId.email})</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>
                <button
                  className="bg-green-500 text-white px-2 py-1 mr-2"
                  onClick={() => updateStatus(product._id, 'approved')}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => updateStatus(product._id, 'rejected')}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPendingProducts;

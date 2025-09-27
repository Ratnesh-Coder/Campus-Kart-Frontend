import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Product } from './Main';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // State for form fields
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Books');
  
  // State for component status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found.');
        }
        const product: Product = await response.json();

        // Security check: ensure the logged-in user is the seller
        if (user?._id !== product.sellerId) {
            throw new Error('You are not authorized to edit this product.');
        }

        // Pre-fill the form with existing data
        setTitle(product.title);
        setPrice(product.price.toString());
        setDescription(product.description);
        setCategory(product.category);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && id) {
      fetchProductData();
    } else if (!user) {
        setError('You must be logged in to edit a product.');
        setLoading(false);
    }
  }, [id, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, price: Number(price), description, category })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update product.');
        }

        alert('Product updated successfully!');
        navigate('/profile');

    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 font-semibold">Loading editor...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-600">Error</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <Link to="/profile" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold">
          Back to Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Your Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Item Title</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required/>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required/>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select id="category" value={category} onChange={e => setCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm" required>
              <option>Books</option>
              <option>Electronics</option>
              <option>Lab Equipment</option>
              <option>Stationery</option>
              <option>Furniture</option>
            </select>
          </div>
        </div>
         <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}
            rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required/>
        </div>
        <p className="text-sm text-gray-500">Note: Image cannot be edited at this time.</p>
        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400">
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
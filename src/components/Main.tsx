import { useEffect, useState } from "react";
import Home from "./Home";

export interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  sellerId: string;
  postDate: string;
}

type MainProps = {
  search: string;
  menu: string;
}

const Main = (props: MainProps) => {
  const { search, menu } = props;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (menu) params.append('category', menu);
        
        const response = await fetch(`http://localhost:5000/api/products?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // We use a timeout to delay the fetch slightly after the user stops typing
    const debounceFetch = setTimeout(() => {
        fetchProducts();
    }, 300); // 300ms delay

    // Cleanup function to clear the timeout if the user types again
    return () => clearTimeout(debounceFetch);
  }, [search, menu]);

  return (
    <Home
      products={products}
      loading={loading}
      error={error}
    />
  );
};

export default Main;
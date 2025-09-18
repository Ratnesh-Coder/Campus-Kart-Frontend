import { useEffect, useState } from "react";
import Home from "./Home";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

type MainProps = {
  search: string;
  menu: string;
}

const Main = (props: MainProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // We will replace this with a real API call soon
        const response = await fetch('http://localhost:5000/api/products');
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

    fetchProducts();
  }, []);

  return (
    <Home
      products={products}
      search={props.search}
      menu={props.menu}
      loading={loading}
      error={error}
    />
  );
};

export default Main;
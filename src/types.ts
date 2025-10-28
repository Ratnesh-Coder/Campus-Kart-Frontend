export interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string[];
  images?: string[];
  category: string;
  description: string;
  sellerId: string;
  postDate: string;
}
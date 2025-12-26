import Link from 'next/link';
import styles from './ProductCard.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';
// import api from '@/lib/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // URL
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
        alert('Added to cart (Mock)!');
        setLoading(false);
    }, 500);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* Placeholder if no image, or use generated/fetched image */}
        <img 
          src={product.imageUrl || 'https://placehold.co/400x400/27272a/FFF?text=Product'} 
          alt={product.name} 
          className={styles.image} 
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title} title={product.name}>{product.name}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.actions}>
           <button onClick={addToCart} disabled={loading} className="btn btn-primary w-full" style={{ gap: '0.5rem' }}>
             <FiShoppingCart /> {loading ? 'Adding...' : 'Add to Cart'}
           </button>
           <Link href={`/products/${product._id}`} className="btn btn-outline w-full mt-4" style={{ marginTop: '0.5rem', width: '100%', textAlign: 'center', display: 'flex' }}>
             View Details
           </Link>
        </div>
      </div>
    </div>
  );
}

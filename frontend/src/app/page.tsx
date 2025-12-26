'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
// import api from '@/lib/api'; // Removed integration
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function Home() {
  // Mock data for display purposes
  const [products] = useState<Product[]>([
    { _id: '1', name: 'Wireless Headphones', description: 'Premium noise cancelling headphones.', price: 199.99, imageUrl: 'https://placehold.co/400x400/27272a/FFF?text=Headphones' },
    { _id: '2', name: 'Smart Watch', description: 'Track your fitness and stay connected.', price: 299.99, imageUrl: 'https://placehold.co/400x400/27272a/FFF?text=Watch' },
    { _id: '3', name: 'Gaming Laptop', description: 'High performance gaming on the go.', price: 1299.99, imageUrl: 'https://placehold.co/400x400/27272a/FFF?text=Laptop' },
    { _id: '4', name: 'Smartphone', description: 'Latest technology in your pocket.', price: 899.99, imageUrl: 'https://placehold.co/400x400/27272a/FFF?text=Phone' },
  ]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => { ... removed ... }, []);

  return (
    <>
      <section className={styles.hero}>
        <img src="/hero.png" alt="Hero Background" className={styles.heroImage} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Experience the Future of Shopping</h1>
          <p className={styles.heroSubtitle}>Premium electronics, curated for you.</p>
          <div className="flex gap-4 justify-center">
             <Link href="/products" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
               Shop Now <FiArrowRight className="ml-2" />
             </Link>
             <Link href="/register" className="btn btn-outline" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
               Join Us
             </Link>
          </div>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        
        {loading ? (
           <div className="flex justify-center p-8">
             <div style={{ width: '40px', height: '40px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
             <style jsx>{`
                @keyframes spin { to { transform: rotate(360deg); } }
             `}</style>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {products.slice(0, 8).map(product => (
               <ProductCard key={product._id} product={product} />
             ))}
             {products.length === 0 && <p className="text-center text-muted col-span-full">No products found. Start by adding some in the admin panel!</p>}
          </div>
        )}
      </section>
    </>
  );
}

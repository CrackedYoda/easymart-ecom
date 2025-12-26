'use client';

import { useEffect, useState } from 'react';
// import api from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    // Mock Cart
    setTimeout(() => {
        setCart({
            items: [
                {
                    _id: '123',
                    quantity: 1,
                    product: {
                        name: 'Wireless Headphones',
                        price: 199.99,
                        imageUrl: 'https://placehold.co/400x400/27272a/FFF?text=Headphones'
                    }
                },
                {
                    _id: '456',
                    quantity: 2,
                    product: {
                        name: 'Smart Watch',
                        price: 299.99,
                        imageUrl: 'https://placehold.co/400x400/27272a/FFF?text=Watch'
                    }
                }
            ]
        });
        setLoading(false);
    }, 500);
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    const total = cart.items.reduce((sum: number, item: any)=> {return sum + item.quantity * item.product.price }, 0)
    return total;
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    setTimeout(() => {
        alert('Order placed successfully (Mock)!');
        setCart({ items: [] }); 
        setCheckingOut(false);
        // router.push('/orders');
    }, 1000);
  };

  if (loading) return <div className="p-8 text-center">Loading cart...</div>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container py-16 text-center animate-fadeIn">
        <div className="flex justify-center mb-6">
           <div className="p-6 bg-secondary rounded-full">
              <FiShoppingBag size={48} className="text-muted-foreground" />
           </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/products" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fadeIn">
      <Link href="/products" className="text-muted hover:text-primary flex items-center gap-2 mb-6">
        <FiArrowLeft /> Continue Shopping
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <div className="bg-card rounded-lg border shadow overflow-hidden">
             {cart.items.map((item: any) => (
                <div key={item._id} className="p-6 border-b border-border flex items-center gap-4">
                   {/* If populated product */}
                   {item.product ? (
                     <>
                       <div className="w-20 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                         {item.product.imageUrl && <img src={item.product.imageUrl} className="w-full h-full object-cover" />}
                       </div>
                       <div className="flex-1">
                         <h3 className="font-semibold">{item.product.name}</h3>
                         <p className="text-muted-foreground text-sm">${item.product.price.toFixed(2)}</p>
                       </div>
                       <div className="flex items-center gap-4">
                         <span className="font-medium">Qty: {item.quantity}</span>
                         <button className="text-destructive hover:text-red-400 p-2">
                           <FiTrash2 />
                         </button>
                       </div>
                     </>
                   ) : (
                     <div className="text-muted">Product details unavailable</div>
                   )}
                </div>
             ))}
           </div>
        </div>
        
        <div className="lg:col-span-1">
           <div className="bg-card rounded-lg border shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-muted">Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              
              <button 
                onClick={handleCheckout} 
                className="btn btn-primary w-full py-3 text-lg"
                disabled={checkingOut}
              >
                {checkingOut ? 'Proccessing...' : 'Checkout'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

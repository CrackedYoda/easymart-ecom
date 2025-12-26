'use client';

import { useEffect, useState } from 'react';
// import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { FiUsers, FiShoppingBag, FiBox, FiTrash2, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('users'); // users, orders, products
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // Default true for UI Mock

  useEffect(() => {
    // checkAdmin();
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
        // Mock Data
        setUsers([
            { _id: 'u1', userName: 'Alice Admin', userEmail: 'alice@example.com', role: 'admin', isSuspended: false },
            { _id: 'u2', userName: 'Bob User', userEmail: 'bob@example.com', role: 'user', isSuspended: false },
            { _id: 'u3', userName: 'Charlie User', userEmail: 'charlie@example.com', role: 'user', isSuspended: true },
        ]);
        setOrders([
            { _id: 'o12345678', customer: { userName: 'Bob User' }, totalAmount: 499.98, orderStatus: 'Pending'},
            { _id: 'o87654321', customer: { userName: 'Charlie User' }, totalAmount: 129.50, orderStatus: 'Delivered'},
        ]);
        setProducts([
            { _id: 'p1', name: 'Wireless Headphones', price: 199.99, stock: 50 },
            { _id: 'p2', name: 'Smart Watch', price: 299.99, stock: 30 },
            { _id: 'p3', name: 'Gaming Laptop', price: 1299.99, stock: 10 },
        ]);
        setLoading(false);
    }, 500);
  };

  const toggleSuspend = async (id: string) => {
      // Mock toggle
      setUsers(users.map(u => u._id === id ? { ...u, isSuspended: !u.isSuspended } : u));
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setProducts(products.filter(p => p._id !== id));
  };

  if (!isAdmin) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="container py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8">Admin Panel (Mock Data)</h1>
      
      <div className="flex gap-4 mb-8 border-b border-border pb-2">
        <button 
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-muted'}`}
        >
          <FiUsers /> Users
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'orders' ? 'text-primary border-b-2 border-primary' : 'text-muted'}`}
        >
          <FiShoppingBag /> Orders
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'products' ? 'text-primary border-b-2 border-primary' : 'text-muted'}`}
        >
          <FiBox /> Products
        </button>
      </div>

      <div className="bg-card rounded-lg border shadow overflow-hidden">
        {loading && <div className="p-8 text-center">Loading data...</div>}
        
        {!loading && activeTab === 'users' && (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-t border-border hover:bg-secondary/50 max-w-full">
                  <td className="p-4 font-medium">{user.userName}</td>
                  <td className="p-4">{user.userEmail}</td>
                  <td className="p-4"><span className="badge">{user.role}</span></td>
                  <td className="p-4">
                    {user.isSuspended ? (
                      <span className="text-destructive flex items-center gap-1"><FiAlertTriangle size={14}/> Suspended</span>
                    ) : (
                      <span className="text-green-500 flex items-center gap-1"><FiCheckCircle size={14}/> Active</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleSuspend(user._id)} 
                      className={`btn btn-sm ${user.isSuspended ? 'btn-primary' : 'btn-outline'}`}
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      {user.isSuspended ? 'Activate' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {!loading && activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? <p className="p-8 text-center text-muted">No orders found.</p> : (
              <table className="w-full text-left text-sm">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                   {orders.map(order => (
                     <tr key={order._id} className="border-t border-border">
                       <td className="p-4">{order._id.substring(0, 8)}...</td>
                       <td className="p-4">{order.customer?.userName || 'Unknown'}</td>
                       <td className="p-4">${order.totalAmount?.toFixed(2)}</td>
                       <td className="p-4">{order.orderStatus}</td>
                     </tr>
                   ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {!loading && activeTab === 'products' && (
           <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
             <tbody>
               {products.map(product => (
                 <tr key={product._id} className="border-t border-border hover:bg-secondary/50">
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4">${product.price.toFixed(2)}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => deleteProduct(product._id)}
                        className="text-destructive hover:text-red-400 p-2"
                        title="Delete Product"
                      >
                         <FiTrash2 size={18} />
                      </button>
                    </td>
                 </tr>
               ))}
               {products.length === 0 && <tr><td colSpan={4} className="p-8 text-center">No products found.</td></tr>}
             </tbody>
           </table>
        )}
      </div>
    </div>
  );
}

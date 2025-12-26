'use client';

import { useState } from 'react';
// import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiAlertCircle } from 'react-icons/fi';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    userName: '', 
    userEmail: '', 
    userPhone: '', 
    userPassword: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    setTimeout(() => {
        console.log("Register Data:", formData);
        router.push('/login?registered=true');
        setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 animate-fadeIn">
        <h1 className="text-3xl text-center mb-2 font-bold">Create Account</h1>
        <p className="text-center text-muted mb-6">Join EasyMart today</p>
        
        {error && (
            <div className="bg-destructive/20 text-destructive p-3 rounded mb-4 text-sm flex items-center gap-2">
                <FiAlertCircle /> {error}
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              name="userName" 
              value={formData.userName} 
              onChange={handleChange} 
              required 
              className="input"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              name="userEmail" 
              value={formData.userEmail} 
              onChange={handleChange} 
              required 
              className="input"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input 
              type="tel" 
              name="userPhone" 
              value={formData.userPhone} 
              onChange={handleChange} 
              required 
              className="input"
              placeholder="+1234567890"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              name="userPassword" 
              value={formData.userPassword} 
              onChange={handleChange} 
              required 
              className="input"
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up (Demo)'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

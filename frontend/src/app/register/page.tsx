'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiAlertCircle } from 'react-icons/fi';

type RegisterForm = {
  userName: string;
  userEmail: string;
  userPhone: string;
  userPassword: string;
  role: 'user' | 'merchant';
};

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    defaultValues: {
      role: 'user',
    },
  });
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data: RegisterForm) => {
    setServerError('');
    try {
      await api.post('/api/user', data);
      router.push('/login');
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 animate-fadeIn">
        <h1 className="text-3xl text-center mb-2 font-bold">Create Account</h1>
        <p className="text-center text-muted mb-6">Join EasyMart today</p>
        
        {serverError && (
            <div className="bg-destructive/20 text-destructive p-3 rounded mb-4 text-sm flex items-center gap-2">
                <FiAlertCircle /> {serverError}
            </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              {...register('userName', { 
                required: 'Full Name is required',
                minLength: { value: 4, message: 'Name must be at least 4 characters' }
              })}
              className="input"
              placeholder="John Doe"
            />
            {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              {...register('userEmail', { required: 'Email is required' })}
              className="input"
              placeholder="john@example.com"
            />
            {errors.userEmail && <p className="text-red-500 text-xs mt-1">{errors.userEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input 
              type="tel" 
              {...register('userPhone', { 
                required: 'Phone is required',
                minLength: { value: 11, message: 'Phone must be at least 11 digits' },
                maxLength: { value: 20, message: 'Phone must be at most 20 digits' }
              })}
              className="input"
              placeholder="+1234567890"
            />
            {errors.userPhone && <p className="text-red-500 text-xs mt-1">{errors.userPhone.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              {...register('userPassword', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              className="input"
              placeholder="••••••••"
            />
            {errors.userPassword && <p className="text-red-500 text-xs mt-1">{errors.userPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Account Type</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="user"
                  {...register('role')}
                  className="w-4 h-4 accent-primary"
                />
                <span>User</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="merchant"
                  {...register('role')}
                  className="w-4 h-4 accent-primary"
                />
                <span>Merchant</span>
              </label>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-muted">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

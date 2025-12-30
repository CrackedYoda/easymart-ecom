'use client';

import {useForm} from "react-hook-form";
import api from '@/lib/api';
// import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setAccessToken } from '@/helpers/getaccesstoken';


export default function Login() {
const router = useRouter()
type loginForm = {
  userEmail:string,
  userPassword:string,
  rememberMe: boolean
}



const{register, handleSubmit, setError, formState: {errors, isSubmitting}}= useForm<loginForm>({defaultValues:{
    userEmail:"",
    userPassword:"",
    rememberMe:false},});

    const onSubmit = async(data:loginForm) =>{
       try {
        const res = await api.post('/user/login', data);
        if (res.data.token) {
          setAccessToken(res.data.token);
        }
        router.push('/home');

       }
       catch (error: any){
        const field =error.response?.data?.field;
        const message = error.response?.data?.message || 'Login failed. Please try again.';
        
        setError(field, {message: message})
       }
      

    }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md p-8 animate-fadeIn">
        <h1 className="text-3xl text-center mb-6 font-bold">Welcome Back</h1>
        
       
        {errors.userEmail && (<p className="text-red-500 text-sm mb-2">{errors.userEmail.message}</p>
        )}
        {errors.userPassword && (
          <p className="text-red-500 text-sm mb-2">{errors.userPassword.message}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              {...register('userEmail', {required: 'Email is required'})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              {...register('userPassword', {required: 'Password is required'})}
            />
          </div>
          <div>
            <label >Remember Me</label>
            <input type='checkbox' {...register('rememberMe')} />


          </div>
          <button type="submit" className="btn btn-primary w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login (Demo)'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-muted">
          Don't have an account? <Link href="/register" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

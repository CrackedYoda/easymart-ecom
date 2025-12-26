'use client';

import Link from 'next/link';
import { FiShoppingCart, FiUser, FiSearch, FiLogOut } from 'react-icons/fi';
import styles from './Navbar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false for UI demo
  const router = useRouter();

  // Removed cookie check for backend integration removal
  // useEffect(() => { ... }, []);

  const handleLogout = () => {
    // Cookies.remove('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          EasyMart
        </Link>
        
        <div className={styles.links}>
           <Link href="/" className={styles.link}>Home</Link>
           <Link href="/products" className={styles.link}>Shop</Link>
           {/* For demo purposes, we can show Orders link if "logged in" state is toggled */}
           {/* {isLoggedIn && <Link href="/orders" className={styles.link}>Orders</Link>} */}
           <Link href="/orders" className={styles.link}>Orders</Link>
        </div>

         <div className={styles.actions}>
            <button className={styles.iconBtn}>
               <FiSearch size={20} />
            </button>
            <Link href="/cart" className={styles.iconBtn} style={{position: 'relative'}}>
               <FiShoppingCart size={20} />
               {/* <span className={styles.cartBadge}>2</span> */} 
            </Link>
            
            {isLoggedIn ? (
                <>
                  <Link href="/profile" className={styles.iconBtn}>
                     <FiUser size={20} />
                  </Link>
                  <button onClick={handleLogout} className={styles.iconBtn} title="Logout">
                     <FiLogOut size={20} />
                  </button>
                </>
            ) : (
                <div className={styles.authButtons}>
                    <Link href="/login" className="btn btn-ghost" style={{fontSize: '0.875rem'}}>Login</Link>
                    <Link href="/register" className="btn btn-primary" style={{fontSize: '0.875rem'}}>Sign Up</Link>
                </div>
            )}
         </div>
      </div>
    </nav>
  );
}

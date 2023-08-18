"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useState, useEffect } from 'react'; 
import pro from '../../../public/profile.png'

export default function Cart() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState(null);

  const fetchCartData = async (userId) => {
    try {
      const res = await fetch(`/api/cart/${userId}`, { cache: "no-store" });
      const result = await res.json();
      const data = result.cart;
      setCartData(data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetch(`/api/profile/${session.user.email}`)
        .then(response => response.json())
        .then(data => setUserData(data.user))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [status, session]);

  useEffect(() => {
    if (userData) {
      fetchCartData(userData.user_id);
    }
  }, [userData]);

  if (status === 'loading') {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-test-color'>
        <div className="w-16 h-16 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signIn');
    return null;
  }
console.log(cartData)
console.log(userData)
  return (
    <div className='flex flex-col justify-start items-center h-screen bg-test-color'>
       {cartData.map((result) => (
        <>
          <p className="text-white min-[320px]:text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mt-5">product id ={result.product_id}</p>
          <p className="text-white min-[320px]:text-xl sm:text-3xl md:text-xl lg:text-xl xl:text-2xl font-bold mt-5"> quantity ={result.quantity}</p>
        </>
      ))}
    </div>
  );
}


"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useState, useEffect } from 'react'; 
export default function Confirm({params}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [cartData, setCartData] = useState(null);
    const [productData, setProductData] = useState([]);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [success,setSuccess] = useState(false)

  const handlePlaceOrder = async (productId) => {
    if (!session) {
      // User is not logged in, handle this scenario (e.g., redirect to login).
      return;
    }
const order = {
  user_id: userData.user_id, // Use the correct field for user_id
  product_id: productId,
  order_status:1,
}
console.log(order)
    try {
      setIsAddingToCart(true);
      // Send a POST request to add the order.
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setSuccess(true)
        // Handle success (e.g., show a success message).
        console.log('Order placed successfully.');
      } else {
        // Handle the error case.
        console.error('Failed to place the order:', responseData.error);
      }
    } catch (error) {
      console.error('Error placing the order:', error);
    } finally{
      setIsAddingToCart(false);
    }
  };

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
  const fetchProductData = async (productId) => {
    try {
      const res = await fetch(`/api/product/${productId}`, { cache: "no-store" });
      const result = await res.json();
      const data = result.product;
      setProductData(prevData => [...prevData, data]);
      
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null;
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

  useEffect(() => {
    if (cartData) {
      {cartData.map((result)=>{
        fetchProductData(result.product_id);
      })}
      
    }
  }, [cartData]);


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
    return (
        <div className="flex flex-col justify-start items-center h-screen bg-test-color">
            <p className='text-white'>cart_id:{params.id}</p>
            </div>
    );
}
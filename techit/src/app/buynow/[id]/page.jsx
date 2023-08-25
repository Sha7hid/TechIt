"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useState, useEffect } from 'react'; 
import toast, { Toaster } from 'react-hot-toast';
export default function Confirm({params}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [success,setSuccess] = useState(false)
 
  
  

  const fetchProductData = async (productId) => {
    try {
      const res = await fetch(`/api/product/${productId}`, { cache: "no-store" });
      const result = await res.json();
      const data = result.product;
      setProductData(data);
      
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
    fetchProductData(params.id);
    
  }, [params.id]);

  
 
  const handlePlaceOrder = async () => {
    if (!session) {
      // User is not logged in, handle this scenario (e.g., redirect to login).
      return;
    }
    const num = 1;
    const order = {
      user_id: userData?.user_id, // Use the correct field for user_id
      product_id: productData?.Product_ID,
      order_status:num,
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
  if(success==true){
    toast.success("Successfully Placed Order")
    setSuccess(false)
  }
    return (
      <main className="flex flex-col justify-center items-center h-screen bg-test-color text-white">
           <Toaster/>
           {productData ? (
  <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 ml-11 mr-10 mb-11 mt-11">
 
 <img src={productData.Image} alt="Laptop Photo" class="w-auto  h-auto rounded-lg"/>
 <div className=" min-[320px]:pl-2 min-[320px]:pr-2 min-[320px]:pt-2 lg:pl-9 lg:pt-4 pb-4 md:pt-4 md:pl-9 sm:pl-5 sm:pt-2 flex flex-col justify-between">
   <div>
     <h3 className="sm:text-xs md:text-base lg:text-xl font-semibold mb-2 lg:pr-6 md:pr-4 sm:pr-2   min-[320px]:text-sm">{productData.Product_Name}</h3>
     <p className="text-white-600 lg:pl-2 lg:pr-3 md:pl-2 md:pr-3 sm:pl-1 sm:pr-2 sm:text-xs md:text-base lg:text-base  min-[320px]:text-sm">Total Amount : ${productData.Price}</p>
   </div>
  
   <button
        className="min-[320px]:text-xs sm:text-xs md:text-base lg:text-base min-[320px]:mt-2 min-[320px]:mr-2 lg:mt-4 lg:mr-3 md:mt-4 md:mr-3 sm:mt-2 sm:mr-1 bg-black text-white rounded-md min-[320px]:px-2 min-[320px]:py-1 lg:px-4 lg:py-2 md:px-4 md:py-2 sm:px-2 sm:py-2 hover:bg-blue-600 transition duration-300"
        onClick={handlePlaceOrder}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? 'Placing Order...' : 'Pay On Delivery'}
      </button>
      <a className= " flex justify-center items-center min-[320px]:text-xs sm:text-xs md:text-base lg:text-base min-[320px]:mt-2 min-[320px]:mr-2 lg:mt-4 lg:mr-3 md:mt-4 md:mr-3 sm:mt-2 sm:mr-1 bg-black text-white rounded-md min-[320px]:px-2 min-[320px]:py-1 lg:px-4 lg:py-2 md:px-4 md:py-2 sm:px-2 sm:py-2 hover:bg-blue-600 transition duration-300"
      href='https://buy.stripe.com/test_4gw14O4bo0G79dSbIJ'
      >
        Pay Online</a>
 </div>
</div>
  ) : (
    <div className='flex flex-col justify-center items-center  h-screen bg-test-color'>
        <div className="w-16 h-16 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
      </div>
  )}
        </main>

    );
}
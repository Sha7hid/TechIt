"use client";
import { useSession } from 'next-auth/react';
import { useState ,useEffect} from 'react'; 
export default function Product({ params }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [productData, setProductData] = useState(null); // State to store product data
  const [isAddingToCart, setIsAddingToCart] = useState(false); 
const [success,setSuccess] = useState(false)

  const fetchProductData = async () => {
    try {
      const res = await fetch(
        `/api/product/${params.id}`,
        { cache: "no-store" }
      );
      const result = await res.json();
      const data = result.product
      setProductData(data); // Store the product data in state
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/profile/${session.user.email}`);
      const result = await res.json();
      const userData = result.user;
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };
  

  useEffect(() => {
    fetchProductData();
    if (status === 'authenticated' && session?.user?.email) {
      fetchUserData(session.user.email)
        .then(data => setUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [params.id,session,status]);

  const cartData = { // Renamed the variable to avoid naming conflict
    productId: productData?.Product_ID,
    userId: userData?.user_id,
    quantity: 1, // You can adjust the quantity as needed
  };
console.log(cartData)
  const handleAddToCart = async () => {
    if (!session || !session.user) {
      console.log('User not logged in. Redirecting to login page...');
      // Redirect the user to the login page
      return;
    }

    try {
      setIsAddingToCart(true);

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setSuccess(true)
        console.log('Item added to cart successfully.');
        // You might want to display a confirmation message here
      } else {
        console.error('Failed to add item to cart:', responseData.error);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle the error case
    } finally {
      setIsAddingToCart(false);
    }
  };
 return (
        <main className="bg-test-color text-white">
           {productData ? (
  <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 ml-11 mr-10 mb-11 mt-11">
 
 <img src={productData.Image} alt="Laptop Photo" class="w-auto  h-auto rounded-lg"/>
 <div className=" min-[320px]:pl-2 min-[320px]:pr-2 min-[320px]:pt-2 lg:pl-9 lg:pt-4 pb-4 md:pt-4 md:pl-9 sm:pl-5 sm:pt-2 flex flex-col justify-between">
   <div>
     <h3 className="sm:text-xs md:text-base lg:text-xl font-semibold mb-2 lg:pr-6 md:pr-4 sm:pr-2   min-[320px]:text-sm">{productData.Product_Name}</h3>
     <p className="text-white-600 lg:pl-2 lg:pr-3 md:pl-2 md:pr-3 sm:pl-1 sm:pr-2 sm:text-xs md:text-base lg:text-base  min-[320px]:text-sm">{productData.Price}</p>
   </div>
   <div className="mt-2 sm:text-xs md:text-base lg:text-base  min-[320px]:text-xs">
     <ul className="list-disc lg:pl-2 lg:pr-3 md:pl-2 md:pr-3 sm:pl-1 sm:pr-2">
     <li>{productData.Processor}</li>
       <li>{productData.Memory}</li>
     </ul>
   </div>
   <p>{productData.Details}</p>
   <button
        className="min-[320px]:text-xs sm:text-xs md:text-base lg:text-base min-[320px]:mt-2 min-[320px]:mr-2 lg:mt-4 lg:mr-3 md:mt-4 md:mr-3 sm:mt-2 sm:mr-1 bg-black text-white rounded-md min-[320px]:px-2 min-[320px]:py-1 lg:px-4 lg:py-2 md:px-4 md:py-2 sm:px-2 sm:py-2 hover:bg-blue-600 transition duration-300"
        onClick={handleAddToCart}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? 'Adding to cart...' : 'Add to cart'}
      </button>
    {success ? <p>successfully added to cart</p> :<p></p>}
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
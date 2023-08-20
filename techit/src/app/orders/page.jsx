"use client";
import {useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { useState, useEffect } from "react";


export default function Orders() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isLoadingProductData, setIsLoadingProductData] = useState(true);

  const fetchOrderData = async (userId) => {
    try {
      const res = await fetch(`/api/orders/${userId}`, { cache: "no-store" });
      const result = await res.json();
      const data = result.order;
      console.log(data)
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const fetchProductData = async (productId, order_status) => {
    try {
      setIsLoadingProductData(true); // Set loading state to true while fetching data

      const res = await fetch(`/api/product/${productId}`, {
        cache: "no-store",
      });
      const result = await res.json();
      const data = {
        ...result.product,
        order_status: order_status,
      };
      setProductData((prevData) => [...prevData, data]);
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
    } finally {
      setIsLoadingProductData(false); // Set loading state to false when data is fetched
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetch(`/api/profile/${session.user.email}`)
        .then((response) => response.json())
        .then((data) => setUserData(data.user))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [status, session]);

  useEffect(() => {
    if (userData) {
      fetchOrderData(userData.user_id);
    }
  }, [userData]);

  useEffect(() => {
    if (orderData) {
      orderData.map((result) => {
        fetchProductData(result.product_id,result.order_status);
      });
    }
  }, [orderData]);

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-test-color">
        <div className="w-16 h-16 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/auth/signIn");
    return null;
  }
console.log(productData)
  return (
    <div className="flex flex-col justify-start items-center h-screen bg-test-color">
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 ml-11 mr-10 mb-11 mt-11">
        {isLoadingProductData
          ? (
            <div className="w-full lg:w-96 bg-test-color2 rounded-lg shadow-lg flex text-white">
              <div className="w-52 h-auto rounded-lg bg-gray-500 animate-pulse"></div>
              <div className="min-[320px]:pl-2 min-[320px]:pr-2 min-[320px]:pt-2 lg:pl-9 lg:pt-4 pb-4 md:pt-4 md:pl-9 sm:pl-5 sm:pt-2 flex flex-col justify-between">
                <div>
                  <div className="bg-gray-500 h-5 w-40 animate-pulse"></div>
                  <div className="bg-gray-500 h-3 w-32 mt-2 animate-pulse"></div>
                </div>
                <div className="mt-2 sm:text-xs md:text-base lg:text-base  min-[320px]:text-xs">
                  <div className="bg-gray-500 h-7 w-32 animate-pulse"></div>
                </div>
                <div className="bg-gray-500 h-6 w-20 mt-2 animate-pulse"></div>
              </div>
            </div>
          )
          : productData &&
            productData.map((result) => (
              <>
                <div class="w-full lg:w-96 bg-test-color2 rounded-lg shadow-lg flex text-white">
                  <img
                    src={result.Image}
                    alt="Laptop Photo"
                    class="w-52  h-auto rounded-lg"
                  />
                  <div class=" min-[320px]:pl-2 min-[320px]:pr-2 min-[320px]:pt-2 lg:pl-9 lg:pt-4 pb-4 md:pt-4 md:pl-9 sm:pl-5 sm:pt-2 flex flex-col justify-between">
                    <div>
                      <h3 class="sm:text-xs md:text-base lg:text-xl font-semibold mb-2 lg:pr-6 md:pr-4 sm:pr-2   min-[320px]:text-sm">
                        {result.Product_Name}
                      </h3>
                      <p class="text-white-600 lg:pl-2 lg:pr-3 md:pl-2 md:pr-3 sm:pl-1 sm:pr-2 sm:text-xs md:text-base lg:text-base  min-[320px]:text-sm">
                        {result.Price}
                      </p>
                    </div>
                    <div class="mt-2 sm:text-xs md:text-base lg:text-base  min-[320px]:text-xs">
                      <ul class="list-disc lg:pl-2 lg:pr-3 md:pl-2 md:pr-3 sm:pl-1 sm:pr-2">
                        <li>{result.Processor}</li>
                        <li>{result.Memory}</li>
                      </ul>
                    </div>
                    <p className={`font-semibold lg:pl-2 lg:pr-3 md:pl-2 md:pr-3 sm:pl-1 sm:pr-2 sm:text-xs md:text-base lg:text-base  min-[320px]:text-sm ${
  result.order_status === 1
    ? 'text-yellow-500' // Yellow for 'Packed'
    : result.order_status === 2
    ? 'text-blue-500'   // Blue for 'Shipped'
    : result.order_status === 3
    ? 'text-green-500'  // Green for 'Delivered'
    : 'text-gray-500'   // Gray for 'Unknown Status'
}`}>
  {result.order_status === 1
    ? 'Packed'
    : result.order_status === 2
    ? 'Shipped'
    : result.order_status === 3
    ? 'Delivered'
    : 'Unknown Status'}
</p>

                  </div>
                </div>
              </>
            ))}
      </div>
    </div>
  );
}
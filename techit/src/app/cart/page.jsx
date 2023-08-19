"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { useState, useEffect } from "react";
import pro from "../../../public/profile.png";
import Link from "next/link";

export default function Cart() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [productData, setProductData] = useState([]);

  const fetchCartData = async (userId) => {
    try {
      const res = await fetch(`/api/cart/${userId}`, { cache: "no-store" });
      const result = await res.json();
      const data = result.cart;
      setCartData(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  const fetchProductData = async (productId,cart_id) => {
    try {
      const res = await fetch(`/api/product/${productId}`, {
        cache: "no-store",
      });
      const result = await res.json();
      const data = {
        ...result.product, // Copy existing properties from result.product
        cart_id: cart_id, // Add cart_id as a property
      };
      setProductData((prevData) => [...prevData, data]);
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
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
      fetchCartData(userData.user_id);
    }
  }, [userData]);

  useEffect(() => {
    if (cartData) {
      cartData.map((result) => {
        fetchProductData(result.product_id, result.cart_id); // Pass cart_id to fetchProductData
      });
    }
  }, [cartData]);

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
  return (
    <div className="flex flex-col justify-start items-center h-screen bg-test-color">
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 ml-11 mr-10 mb-11 mt-11">
        {productData &&
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
                  <Link className="min-[320px]:text-xs sm:text-xs md:text-base lg:text-base min-[320px]:mt-2 min-[320px]:mr-2 lg:mt-4 lg:mr-3 md:mt-4 md:mr-3 sm:mt-2 sm:mr-1 bg-black text-white rounded-md min-[320px]:px-2 min-[320px]:py-1 lg:px-4 lg:py-2 md:px-4 md:py-2 sm:px-2 sm:py-2 hover:bg-blue-600 transition duration-300" href={`/cart/${result.cart_id}`}>Place order</Link>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
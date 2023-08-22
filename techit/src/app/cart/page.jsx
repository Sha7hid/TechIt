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
  const [isLoadingProductData, setIsLoadingProductData] = useState(true);

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

  const fetchProductData = async (productId, cart_id) => {
    try {
      setIsLoadingProductData(true); // Set loading state to true while fetching data

      const res = await fetch(`/api/product/${productId}`, {
        cache: "no-store",
      });
      const result = await res.json();
      const data = {
        ...result.product,
        cart_id: cart_id,
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
      fetchCartData(userData.user_id);
    }
  }, [userData]);

  useEffect(() => {
    if (cartData) {
      cartData.map((result) => {
        fetchProductData(result.product_id, result.cart_id);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 ml-11 mr-10 mb-11 mt-11">
      {isLoadingProductData ? (
        <div className="min-[320px]:w-60 sm:w-60 md:w-80 lg:w-96 min-[1025px]:w-96 bg-test-color2 rounded-lg shadow-lg flex text-white mb-4">
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
                <div className=" h-auto min-[320px]:w-60 sm:w-64 md:w-80 lg:w-96 min-[1025px]:w-96 bg-test-color2 rounded-lg shadow-lg flex  text-white">
                  <img
                    src={result.Image}
                    alt="Laptop Photo"
                    className="min-[320px]:w-32  sm:w-52 md:w-60 lg:w-52 min-[1025px]:w-52 h-auto rounded-lg"
                  />
                 <div className=" min-[320px]:pl-2 min-[320px]:pt-1 lg:pl-9 lg:pt-4 lg:pb-4 md:pt-4 md:pl-9 sm:pl-5 sm:pt-2 flex flex-col justify-center items-center">
            <div>
              <h3 className="min-[320px]:text-xs sm:text-xs md:text-base lg:text-xl font-semibold lg:mb-2 md:mb-2 sm:mb-1 lg:pr-3 md:pr-2 sm:pr-1 md:line-clamp-1 sm:line-clamp-2 min-[320px]:line-clamp-1  ">
                {result.Product_Name}
              </h3>
              <p className="min-[320px]:text-xs text-white-600 lg:pl-2 lg:pr-3 md:pl-2 md:pr-3 sm:pl-1 sm:pr-2 sm:text-xs md:text-base lg:text-base ">
                {result.Price}
              </p>
            </div>
            <div className="lg:mt-2 md:mt-2 sm:mt-1 sm:text-xs md:text-base lg:text-base ">
              <button
                className="min-[320px]:text-xs sm:text-xs md:text-base lg:text-base  lg:mt-4 lg:mr-3 md:mt-4 md:mr-3 sm:mt-2 sm:mr-1 min-[320px]:mb-1  bg-red-600 text-white rounded-md  lg:px-2 lg:py-1 md:px-2 md:py-2 sm:px-1 sm:py-0.5 min-[320px]:px-1 min-[320px]:py-0.5"
                onClick={() => handleRemoveItem(result.cart_id)} // Replace with your remove item function
              >
                Remove
              </button>
            </div>
            <Link
              className="min-[320px]:text-xs sm:text-xs md:text-base lg:text-base   lg:mt-4 lg:mr-3 md:mt-4 md:mr-3 sm:mt-2 sm:mr-1 bg-black text-white rounded-md  lg:px-4 lg:py-2 md:px-1 md:py-2 sm:px-2 sm:py-2 min-[320px]:px-0.5 min-[320px]:py-1 hover:bg-blue-600 transition duration-300"
              href={`/cart/${result.cart_id}`}
            >
              Place order
            </Link>
          </div>
        </div>
              </>
            ))}
      </div>
    </div>
  );
}


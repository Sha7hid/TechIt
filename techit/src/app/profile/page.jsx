"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useEffect, useState } from 'react'; 
import pro from '../../../public/profile.png'
import Link from 'next/link';
export default function Profile() {
  const { data: session,status } = useSession();
  const router = useRouter();   // Initialize the useRouter hook
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (status === 'authenticated') { // Fetch user data only when authenticated
      // Fetch user data using session.user.email
      fetch(`http://43.205.138.125:8080/users/email/${session.user.email}`) // Replace with your API endpoint
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [status, session]);
  console.log(userData)
  if (status === 'loading') {
    return(
      <div className='flex flex-col justify-center items-center  h-screen bg-test-color'>
<div className="w-16 h-16 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
</div>
    ) 
    ;
  }


  // Check if the user is not signed in and redirect to sign-in page
  if (!session) {
    router.push('/auth/signIn'); // Change the URL as needed
    return null; // Return null to prevent rendering before redirection
  }

  return (
    <div className='flex flex-col justify-start items-center  h-screen bg-test-color'>
     {userData && (
      <>
          <Image src={pro}  alt="Image"
          className="rounded-full min-[320px]:w-16 min-[320px]:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 mt-5"/>
    <p class="text-white min-[320px]:text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mt-5">{userData.username}</p>
    <p class="text-white min-[320px]:text-xl sm:text-3xl md:text-xl lg:text-xl xl:text-2xl font-bold mt-5">{userData.email}</p>
   <div className='flex flex-row justify-center items-center'>
   <Link href={'/'} class="bg-white text-black rounded-full px-4 py-1 text-sm md:text-base lg:text-lg xl:text-xl cursor-pointer mt-5 mr-11 text-bold">Cart</Link>
    <Link href={'/'} class="bg-white text-black rounded-full px-3 py-1 text-sm md:text-base lg:text-lg xl:text-xl cursor-pointer mt-5 text-bold">Orders</Link>
   </div>
    
    </>
      )}
    </div>
  );
}

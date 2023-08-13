"use client";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Profile() {
  const { data: session,status } = useSession();
  const router = useRouter(); // Initialize the useRouter hook
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Check if the user is not signed in and redirect to sign-in page
  if (!session) {
    router.push('/auth/signIn'); // Change the URL as needed
    return null; // Return null to prevent rendering before redirection
  }

  return (
    <div>
      <h1>{session.user.email}</h1>
    </div>
  );
}

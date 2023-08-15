import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmailAndPassword } from '../../db'; // Import the function for fetching user data

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: 'email',
          placeholder: "your email"
        },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        try {
          // Fetch user data using your getUserByEmailAndPassword function
          const user = await getUserByEmailAndPassword(credentials?.email, credentials?.password);

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          // Handle error if fetching user data fails
          console.error('Error fetching user data:', error);
          return null;
        }
      }
    })
  ],
  secret: 'VBh/SS2fQ34dX3Ii08j14erMDC2k5SaNX5bCbI+msJU=',
  pages: {
    signIn: "/auth/signIn"
  }
};

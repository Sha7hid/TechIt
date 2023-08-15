import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'; // Import axios or your preferred HTTP client
export const options: NextAuthOptions = {
    providers:[
        CredentialsProvider({
           name : "Credentials",
credentials:{
    email:{
        label:"Email:",
        type:'email',
        placeholder:"your email"
    },
    password: { label: "Password", type: "password" }
},


async authorize(credentials) {
  try {
    // Fetch user data from the API
    const response = await axios.get('http://43.205.138.125:8080/users/authenticate', {
      params: {
        email: credentials?.email,
        password: credentials?.password
      }
    });

    const user = response.data;

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    // Handle error if API request fails
    console.error('Error fetching user data:', error);
    return null;
  }
}

        })
    ],
    secret:'VBh/SS2fQ34dX3Ii08j14erMDC2k5SaNX5bCbI+msJU=',
    pages:{
        signIn:"/auth/signIn"
    }
}
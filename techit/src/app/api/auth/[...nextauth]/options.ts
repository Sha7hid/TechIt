import type {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
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
async authorize(credentials){
const user={id:"42",email:"dave@gmail.com",password:'nextauth'}
if(credentials?.email === user.email && credentials?.password === user.password){
    return user
}else{
 return null  
}
}
        })
    ],
    secret:'VBh/SS2fQ34dX3Ii08j14erMDC2k5SaNX5bCbI+msJU=',
    pages:{
        signIn:"/auth/signIn"
    }
}
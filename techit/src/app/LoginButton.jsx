'use client';
import {signIn,signOut,useSession} from 'next-auth/react'
import React from 'react'
import { luck} from "@/fonts";

const LoginButton = () => {
    const {data:session} = useSession();
    return(
        <div className='ml-auto flex gap-2'>
            <div className={luck.className}>
{session?.user ?(
    <><button className='text-red-500' onClick={() => signOut()}>Sign Out</button></>
    
):(
    <button className='text-test-color' onClick={() => signIn()}>Sign In</button>
)}
 </div>
        </div>
    )
}
export default LoginButton
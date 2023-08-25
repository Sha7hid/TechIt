'use client';
import {signIn,signOut,useSession} from 'next-auth/react'
import React from 'react'
import { lilita} from "../fonts";

const LoginButton = () => {
    const {data:session} = useSession();
    return(
        <div className='ml-auto flex gap-2'>
            <div className={lilita.className}>
{session?.user ?(
    <><button className='px-2 py-1 text-red-500  bg-black rounded-md' onClick={() => signOut()}>Sign Out</button></>
    
):(
    <button className='px-2 py-1 text-test-color bg-black rounded-md' onClick={() => signIn()}>Sign In</button>
)}
 </div>
        </div>
    )
}
export default LoginButton
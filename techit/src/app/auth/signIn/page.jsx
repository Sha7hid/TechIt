"use client";
import Link from "next/link";
export const dynamic = 'force-dynamic'
import Button from "../../../../components/elements/Button";
import TextBox from "../../../../components/elements/TextBox";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";

const LoginPage = () => {
  const email1 = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    try {
      const result = await signIn("credentials", {
        email: email1.current,
        password: pass.current,
        redirect: true,
        callbackUrl: "/", // Default URL for successful sign-in
      });
      // Handle successful sign-in if needed
      console.log("Sign-in successful:", result);
    } catch (error) {
      // Handle sign-in error
      console.error("Sign-in error:", error);
      
      // Update the URL based on the presence of an error
      const errorUrl = error ? "/error-page" : "/";
      
      // Redirect to the appropriate URL
      window.location.href = errorUrl;
    }
  };

  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-test-color"
      }
    >
      <div className="lg:px-7 lg:py-4 md:px-7 md:py-4 min-[320px]:px-3 min-[320px]:py-3 shadow bg-test-color2 text-white rounded-md flex flex-col gap-2 ">
        <TextBox
          labelText="Email"
          type={"email"}
          onChange={(e) => (email1.current = e.target.value)}
        />
        <TextBox
          labelText="Password"
          type={"password"}
          onChange={(e) => (pass.current = e.target.value)}
        />
        <Button onClick={onSubmit}></Button>
       <p>Don't have an account? then create a new account <Link className={'text-amber-400'}href={'/register'}>Sign Up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from '../styles/form.module.css'
export default function Register() {
    const [success, setSuccess] = useState(null);
    useEffect(() => {
        const myForm = document.getElementById("myForm");
        myForm.addEventListener("submit", function (e) {
          e.preventDefault();
    
          const formData = new FormData(this);
    
          const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
          };
    
          fetch(
            // Your API Post endpoint here
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          )
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(setSuccess(`Successfully added movie ${data.name} `))
            .catch((error) => console.error(error));
        });
      }, []);
    return (
    <main class="min-h-screen bg-test-color flex items-start justify-start">
     
        <form id="myForm" className={'container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-5'}>
            <div className={'bg-test-color2 px-6 py-8 rounded shadow-md  text-black w-full'}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                aria-describedby="name"
                placeholder="your full name"
              />
        
           
              <label className={styles.label}>Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                aria-describedby="email"
                placeholder="your email"
              />
            
           
              <label className={styles.label}>Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                aria-describedby="password"
                placeholder="your password"
              />
         
           
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="cpassword"
                name="cpassword"
                aria-describedby="cpassword"
                placeholder=" confirm password"
              />
               <button type="submit" className={styles.button}>
              Submit
            </button>
            </div>

           
            <p className={styles.success}>{success}</p>
          </form>
          .
       
    </main>
  );
}

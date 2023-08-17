"use client";
import Link from "next/link";
export const dynamic = 'force-dynamic'
import React, { useEffect, useState } from "react";
import styles from '../styles/form.module.css';

export default function Register() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const myForm = document.getElementById("myForm");
    myForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);

      const password = formData.get("password");
      const confirmPassword = formData.get("cpassword");
      const email = formData.get("email");

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (!isValidEmail(email)) {
        setError("Invalid email format.");
        return;
      }

      setError(null);

      const data = {
        username: formData.get("name"),
        email: email,
        password: password,
      };

      fetch(
        '/api/register',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSuccess(`Successfully added user ${data.user.username}`);
        })
        .catch((error) => console.error('Fetch Error:', error));
    });
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
<p className="text-white">If already have an account? <Link className={'text-amber-400'}href={'/auth/signIn'}>Sign In</Link></p>
          <p className={styles.error}>{error}</p>
          <p className={styles.success}>{success}</p>
        </div>
      </form>
    </main>
  );
}
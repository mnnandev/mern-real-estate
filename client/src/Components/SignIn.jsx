import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [data, setData] = useState({}); // State to hold form data

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value, // Dynamically update the state based on input name
    });
    console.log({...data, [e.target.name]: e.target.value}, 'this is a data'); // Log the new data state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/Api/auth/signUp', {  
        method: 'POST', // Use uppercase POST for consistency
        headers: {
          'Content-Type': 'application/json', // Proper capitalization for content-type
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      });

      if (!res.ok) {
        const errorResponse = await res.json(); // Get error details from the response
        throw new Error(errorResponse.message || 'An error occurred'); // Throw a meaningful error message
      }

      const response = await res.json(); // Parse the JSON response
      console.log('Data is added successfully:', response); // Log the successful response
      // Handle successful sign-up (e.g., redirect, show success message)

    } catch (error) {
      console.error('Sign-up failed:', error.message); // Log the error message
      // Display the error message to the user (optional)
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border p-3 rounded-lg"
          onChange={onChangeHandler}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChangeHandler}
          className="border p-3 rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
        </button>
        <button
          type="button"
          className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
        >
          Continue with Google
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5"></p>
    </div>
  );
};

export default SignIn;

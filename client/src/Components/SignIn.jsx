import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSucess,
} from "../redux/user/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  // Formik setup with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      dispatch(signInStart());
      try {
        const res = await axios.post("/api/auth/SignIn", values);
        dispatch(signInSucess(res.data));
        console.log("authenticated user:", res.data); // Log the successful response
        resetForm(); // Reset the form fields after successful submission
        navigate("/");
      } catch (error) {
        if (error.response && error.response.data) {
          // Display specific error message from the server response
          dispatch(
            signInFailure(error.response.data.message || "An error occurred")
          );
        } else {
          // Generic error message for unexpected errors
          dispatch(
            signInFailure(
              "An error occurred while signing in. Please try again."
            )
          );
        }
        setSubmitting(false); // Reset the submitting state
      }
    },
  });

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border p-3 rounded-lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600">{formik.errors.email}</div>
        ) : null}

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border p-3 rounded-lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600">{formik.errors.password}</div>
        ) : null}

{error && (
          <div className="text-red-600">{error}</div> // Display server error messages from Redux
        )}

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={formik.isSubmitting} // Disable button when submitting
        >
          {formik.isSubmitting ? "...Loading" : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;

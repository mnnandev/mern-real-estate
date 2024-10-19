import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation

const SignUp = () => {
    const navigate = useNavigate()
  // Formik setup with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const res = await axios.post("/api/auth/SignUp", values);
        console.log("Data is added successfully:", res.data); // Log the successful response
        resetForm(); // Reset the form fields after successful submission
        navigate('/sign-in')
      } catch (error) {
        // Check if the error is related to duplicate username or email
        if (error.response?.data?.message?.includes("duplicate key error")) {
          const duplicateField = error.response.data.message.includes(
            "username"
          )
            ? "username"
            : "email";
          setErrors({ [duplicateField]: `${duplicateField} already exists` });
        } else {
          console.error(
            "Sign-up failed:",
            error.response?.data?.message || error.message
          );
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="border p-3 rounded-lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-600">{formik.errors.username}</div>
        ) : null}

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

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={formik.isSubmitting} // Disable button when submitting
        >
          {formik.isSubmitting ? "...Loading" : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Already have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

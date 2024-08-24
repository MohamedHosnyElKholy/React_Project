import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { UserContexet } from "../../Contexet/UserContexet";

export default function Login() {
  let { userLogin, setuserLogin } = useContext(UserContexet);
  const navigate = useNavigate();
  const [ApiRequest, setApiRequest] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin(val) {
    setIsLogin(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, val)
      .then((response) => {
        setIsLogin(false);
        if (response.data.message === "success") {
          localStorage.setItem("useToken", response.data.token);
          setuserLogin(response.data.token);
          navigate("/");
        }
      })
      .catch((response) => {
        setIsLogin(false);
        setApiRequest(response.response.data.message);
      });
  }

  let myValidation = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,
    onSubmit: handleLogin,
  });

  return (
    <>
      {ApiRequest && (
        <div className="api-request-container bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 mb-4 text-center">
          {ApiRequest}
        </div>
      )}
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-10">
        <h1 className="text-center text-green-600 font-bold text-2xl">
          Login
        </h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email Address
          </label>
          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center"
          >
            {isLogin ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
          <Link
            to="/forget"
            className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 text-sm font-medium"
          >
            Forget your password?
          </Link>
        </div>
      </form>
    </>
  );
}

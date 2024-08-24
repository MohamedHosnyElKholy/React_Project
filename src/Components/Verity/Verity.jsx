
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function verity() {
  const [loading, setLoading] = useState(false);
  async function sec(val) {
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, val)
    console.log(data);
    if (data.status == "success") {
      // setLoading(false)
      toast.success('Done Go To Write New Password')
    }else{
      setLoading(false)
    }
  }
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: sec,
  });

  return (
    <>
      <div className="container">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Please enter your verification code
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="relative z-0 w-full mb-5 group"
        >
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            aria-label="Verification Code"
          />
          {formik.touched.resetCode && formik.errors.resetCode ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error!</span> {formik.errors.resetCode}
            </div>
          ) : (
            null
          )}
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your Code
          </label>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {loading?<i className="fas fa-spinner fa-spin"></i>: "Done Code !"}
            
          </button>
          <Link
            to={'/rest'}
            className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go To Reset Password
          </Link>
          <Link
            to={'/login'}
            className="mt-4 ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go Login In
          </Link>
        </form>
      </div>
    </>
  );
}

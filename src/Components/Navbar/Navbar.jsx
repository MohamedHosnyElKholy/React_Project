// import style from "./Navbar.module.css";
import { useContext } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContexet } from "../../Contexet/UserContexet";
import { CartContext } from "../../Contexet/CartContext";
export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContexet);
  let { numberOfCartItem } = useContext(CartContext);
  let navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("useToken");
    setuserLogin(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-slate-200 p-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="logo" />
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {userLogin != null && (
            <ul className="hidden md:flex gap-4">
              <li>
                <Link to="">Home</Link>
              </li>
              <li>
                <Link to="cart">
                  Cart <span>{numberOfCartItem}</span>
                </Link>
              </li>
              <li>
                <Link to="wishlist">Wish List</Link>
              </li>
              <li>
                <Link to="products">Products</Link>
              </li>
              <li>
                <Link to="catgories">Categories</Link>
              </li>
              <li>
                <Link to="brands">Brands</Link>
              </li>
            </ul>
          )}

          <div className="flex items-center space-x-6">
            <div className="social flex gap-4">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-tiktok"></i>
              <i className="fa-brands fa-twitter"></i>
            </div>

            {userLogin != null ? (
              <span onClick={signOut} className="cursor-pointer">
                SignOut
              </span>
            ) : (
              <>
                <Link to="login" className="text-sm">
                  Login
                </Link>
                <Link to="register" className="text-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* For mobile view */}
        <div
          id="navbar-sticky"
          className="md:hidden flex flex-col items-center mt-4 hidden"
        >
          {userLogin != null && (
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="">Home</Link>
              </li>
              <li>
                <Link to="cart">
                  Cart <span>{numberOfCartItem}</span>
                </Link>
              </li>
              <li>
                <Link to="wishlist">Wish List</Link>
              </li>
              <li>
                <Link to="products">Products</Link>
              </li>
              <li>
                <Link to="catgories">Categories</Link>
              </li>
              <li>
                <Link to="brands">Brands</Link>
              </li>
            </ul>
          )}
         
          
        </div>
      </nav>
    </>
  );
}

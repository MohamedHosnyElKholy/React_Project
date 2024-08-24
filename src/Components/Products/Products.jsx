import useProduct from "../../Hooks/useProduct";
import style from "../ReacentProduct/ReacentProduct.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Contexet/CartContext";
import { toast } from "react-hot-toast";

export default function ReacentProduct() {
  let { data, isError, isFetched, isLoading, error } = useProduct();
  let { addProductToCart } = useContext(CartContext);
  const [load, setLoad] = useState(false);
  const [loadid, setLoadId] = useState(0);
  const [searchitem, setsearchitem] = useState("");

  async function addItemCart(id) {
    setLoadId(id);
    setLoad(true);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setLoad(false);
      toast.success(response.data.message);
    } else {
      setLoad(false);
      toast.error(response.data.message);
    }
  }

  const filteredProducts =
    data?.data.data.filter((el) =>
      el.title.toLowerCase().includes(searchitem.toLowerCase())
    ) || [];
  if (isError) {
    return <h1>{error}</h1>;
  }
  if (isLoading) {
    return (
      <svg
        className="pl"
        viewBox="0 0 64 64"
        width="64px"
        height="64px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="#000" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <mask id="grad-mask">
            <rect x={0} y={0} width={64} height={64} fill="url(#grad)" />
          </mask>
        </defs>
        <circle
          className="pl__ring"
          cx={32}
          cy={32}
          r={26}
          fill="none"
          stroke="hsl(223,90%,55%)"
          strokeWidth={12}
          strokeDasharray="169.65 169.65"
          strokeDashoffset="-127.24"
          strokeLinecap="round"
          transform="rotate(135)"
        />
        <g fill="hsl(223,90%,55%)">
          <circle
            className="pl__ball1"
            cx={32}
            cy={45}
            r={6}
            transform="rotate(14)"
          />
          <circle
            className="pl__ball2"
            cx={32}
            cy={48}
            r={3}
            transform="rotate(-21)"
          />
        </g>
        <g mask="url(#grad-mask)">
          <circle
            className="pl__ring"
            cx={32}
            cy={32}
            r={26}
            fill="none"
            stroke="hsl(283,90%,55%)"
            strokeWidth={12}
            strokeDasharray="169.65 169.65"
            strokeDashoffset="-127.24"
            strokeLinecap="round"
            transform="rotate(135)"
          />
          <g fill="hsl(283,90%,55%)">
            <circle
              className="pl__ball1"
              cx={32}
              cy={45}
              r={6}
              transform="rotate(14)"
            />
            <circle
              className="pl__ball2"
              cx={32}
              cy={48}
              r={3}
              transform="rotate(-21)"
            />
          </g>
        </g>
      </svg>
    );
  }
  return (
<>
  <div className="container mx-auto p-4">
    {/* Search Bar */}
    <div className="mb-6">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          onChange={(e) => setsearchitem(e.target.value)}
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
      </div>
    </div>

    {/* Products Grid */}
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {filteredProducts.map((prod) => (
        <div key={prod.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <Link to={`productDetials/${prod.id}/${prod.category.name}`} className="block">
            <img
              src={prod.imageCover}
              className="w-full h-48 object-cover"
              alt={prod.name}
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-center mb-2">
                {prod.category.name}
              </h2>
              <p className="text-center mb-2">
                {prod.title.split(" ").slice(0, 2).join(" ")}
              </p>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-bold text-green-600">
                  {prod.price} EGP
                </p>
                <span className="flex items-center text-yellow-500">
                  <i className="fas fa-star"></i> {prod.ratingsAverage}
                </span>
              </div>
            </div>
          </Link>
          <button
            onClick={() => addItemCart(prod.id)}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {load && loadid === prod.id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      ))}
    </div>
  </div>
</>
  );
}

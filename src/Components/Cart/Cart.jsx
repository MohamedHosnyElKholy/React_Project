import { Link } from "react-router-dom";
import { CartContext } from "../../Contexet/CartContext";
import style from "./Cart.module.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";


export default function Cart() {
  let {
    getLoggedUserCart,
    updatecartproductquantity,
    removespecificcartItem,
    clearAll,
  } = useContext(CartContext);
  const [allData, setAllData] = useState(null);

  async function getitem() {
    let response = await getLoggedUserCart();
    setAllData(response?.data?.data);
  }
  async function getUpdateData(count, id) {
    if (count === 0) {
      getRemoveItemCart(id);
    } else {
      let response = await updatecartproductquantity(count, id);
      setAllData(response?.data?.data);
      if (response.data.status === "success") {
        toast.success("Product Updated Successfully.");
      } else {
        toast.error("Failed To Update Product. Please Try Again.");
      }
    }
  }

  async function getRemoveItemCart(id) {
    let response = await removespecificcartItem(id);
    if (response.data.status === "success") {
      setAllData(response.data.data);
      toast.success("Item removed from cart successfully.");
    } else {
      toast.error("Unable to remove item from cart. Please try again later.");
    }
  }
  async function getClearProducts() {
    let response = await clearAll();
    setAllData([]);
  }
  useEffect(() => {
    getitem();
  }, []);

  return (
    <>
      {allData?.products?.length > 0 ? (
        <>
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 p-3">
                Total Price:
                <span className="text-green-600">
                  ${allData?.totalCartPrice}
                </span>
              </h2>
              <button
                onClick={() => getClearProducts()}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
              >
                Clear Product
              </button>
            </div>
            <div className=" w-full relative overflow-x-auto shadow-lg sm:rounded-lg border border-gray-200 bg-white">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allData?.products.map((el) => (
                    
                    <tr
                      key={el.product.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <img
                          src={el.product.imageCover}
                          className=" min-w-[300px]  rounded"
                          alt={el.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {el.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              getUpdateData(el.count - 1, el.product.id)
                            }
                            className="p-2 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
                            type="button"
                          >
                            <span className="sr-only">Decrease Quantity</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <span className="text-gray-700">{el.count}</span>
                          <button
                            onClick={() =>
                              getUpdateData(el.count + 1, el.product.id)
                            }
                            className="p-2 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
                            type="button"
                          >
                            <span className="sr-only">Increase Quantity</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${el.price * el.count}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => getRemoveItemCart(el.product.id)}
                          href="#"
                          className="text-red-600 hover:text-red-800 font-medium hover:underline cursor-pointer"
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to={'/checkout'}>
            <button
              type="button"
              className="w-full my-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              CheckOut
            </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h4l1.68 7.32 1.12-1.61L5 4h14l2 8h-2M1 1h4l1.68 7.32 1.12-1.61L5 4h14l2 8h-2m-3.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />
          </svg>
          <p className="text-gray-700 text-center text-lg font-semibold">
            Your cart is empty.
          </p>
        </div>
      )}
    </>
  );
}

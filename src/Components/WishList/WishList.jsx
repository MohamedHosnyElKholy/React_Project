import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Contexet/CartContext";
import toast from "react-hot-toast";
export default function WishList() {
  const [load, setLoad] = useState(false);
  const [loadid, setLoadId] = useState(0);
  let { getLoggedUserWishlist, removeProductFromWishlist, addProductToCart } =
    useContext(CartContext);
  const [datauser, setdatauser] = useState(null);
  async function handleGetFromWishList() {
    let { data } = await getLoggedUserWishlist();
    setdatauser(data.data);
  }
  async function handleRemoveFromWishList(id) {
    let { data } = await removeProductFromWishlist(id);
    console.log(data);
    if (data.status == "success") {
      toast.success(data.message);
      setdatauser((el) => el.filter((item) => item.id !== id));
    } else {
      toast.error(data.message);
    }
  }
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
  useEffect(() => {
    handleGetFromWishList();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center my-5">My Wish List</h1>
      {datauser?.length > 0 ? (
        <div className="space-y-4 w-[95%] mx-auto">
          {datauser.map((el) => (
            <div
              className="flex flex-wrap justify-between items-center p-4 bg-white shadow-lg rounded-lg border-b border-gray-300"
              key={el.id}
            >
              <div className="flex flex-wrap items-center gap-4">
                <img
                  src={el.imageCover}
                  className="w-24 h-24 object-cover rounded-md"
                  alt={el.slug}
                />
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{el.slug}</p>
                  <p className="text-green-600 font-medium">{el.price}</p>
                  <button
                    className="flex items-center text-red-600 mt-2 hover:text-red-800 transition-colors"
                    onClick={() => handleRemoveFromWishList(el.id)}
                  >
                    <i className="fas fa-trash mr-2"></i> Remove
                  </button>
                </div>
              </div>
              <button
                onClick={() => addItemCart(el.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                {load && loadid == el.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      )}
    </>
  );
}

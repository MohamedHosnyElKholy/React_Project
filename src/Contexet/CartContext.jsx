import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextPorvider(props) {
  const [numberOfCartItem, setnumberOfCartItem] = useState(0);
  let headers = {
    token: localStorage.getItem("useToken"),
  };
  const [first, setfirst] = useState(0);
  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setnumberOfCartItem(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }
  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setfirst(res.data.data._id);
        setnumberOfCartItem(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }
  function updatecartproductquantity(newCount, id) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function removespecificcartItem(removeId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${removeId}`, {
        headers,
      })
      .then((res) => {
        setnumberOfCartItem(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }
  function clearAll() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setnumberOfCartItem(res.data.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }
  function cheakOut(cardId, url, fromData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,
        {
          shippingAddress: fromData,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getAllCatgorys() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => res)
      .catch((err) => err);
  }
  function getSpecificCategory(getid) {
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${getid}/subcategories`
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getAllBrands() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => res)
      .catch((err) => err);
  }
  function getSpecificBrand(idBrand) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${idBrand}`)
      .then((res) => res)
      .catch((err) => err);
  }
  function addWishList(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function removeProductFromWishlist(removeId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${removeId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <CartContext.Provider
      value={{
        clearAll,
        addProductToCart,
        getLoggedUserCart,
        updatecartproductquantity,
        removespecificcartItem,
        cheakOut,
        first,
        getAllCatgorys,
        getSpecificCategory,
        getAllBrands,
        getSpecificBrand,
        addWishList,
        getLoggedUserWishlist,
        removeProductFromWishlist,
        numberOfCartItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

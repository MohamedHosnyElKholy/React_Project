import React, { useContext, useEffect, useState } from "react";
import style from "../ProductDetials/ProductDetials.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../../Contexet/CartContext";
import toast from "react-hot-toast";
export default function ProductDetials() {
  const [load, setLoad] = useState(false);
  const [loadid, setLoadId] = useState(0);
  let { addProductToCart } = useContext(CartContext);

  async function getProductInCart(id) {
    setLoad(true);
    setLoadId(id)
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setLoad(false);
    } else {
      toast.error(response.data.message);
      setLoad(false);
    }
  }
  async function getProductInCartInto(id) {
    setLoad(true);
    setLoadId(id)
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setLoad(false);
    } else {
      toast.error(response.data.message);
      setLoad(false);
    }
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  let { id, category } = useParams();
  const [prodDet, setprodDet] = useState(null);
  const [relatedProdDet, setrelatedProdDet] = useState(null);
  function getSpicitefProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => setprodDet(res.data.data))
      .catch((err) => err);
  }
  function getRelatedProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      setrelatedProdDet(
        res.data.data.filter((product) => product.category.name == category)
      );
    });
  }
  useEffect(() => {
    getSpicitefProduct();
    getRelatedProduct();
  }, [id]);
  return (
    <>
      <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg flex gap-8 items-center">
        {
          <>
            <div className="flex-shrink-0 w-1/3">
              <Slider {...settings}>
                {prodDet?.images.map((src, index) => (
                  <img src={src} alt="src" key={index} className="w-full" />
                ))}
              </Slider>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {prodDet?.title}
              </h2>
              <p className="text-gray-600 mb-4">{prodDet?.description}</p>
              <span className="block text-lg font-semibold text-blue-600 mb-4">
                {prodDet?.category?.name}
              </span>
              <div className="flex justify-between items-center mb-6">
                <p className="text-xl font-bold text-green-600">
                  {prodDet?.price} EGP
                </p>
                <span className="flex items-center text-yellow-500">
                  <i className="fas fa-star mr-1"></i> {prodDet?.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => getProductInCart(prodDet.id)}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              >
                {load && loadid ==  prodDet.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          </>
        }
      </div>
      <div className="container gap-2 justify-center">
        {relatedProdDet?.map((el) => { 
          return (
            <div key={el.id} className="w-1/6">
              <Link to={`/productDetials/${el.id}/${el.category.name}`}>
                <img src={el.imageCover} className="w-100" alt={el.name} />
                <h2 className="text-lg font-bold text-center p-3">
                  {el.category.name}
                </h2>
                <p className="text-center">
                  {el.title.split(" ").slice(0, 2).join("")}
                </p>
                <div className="flex justify-between items-center my-4">
                  <p className="text-lg font-bold text-green-600">
                    {el.price} EGP
                  </p>
                  <span className="flex items-center text-yellow-500">
                    <i className="fas fa-star"></i> {el.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => getProductInCartInto(el._id)}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              >
                {load && loadid ==  el._id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

// تكنلوجي وتنمية الزقازيق

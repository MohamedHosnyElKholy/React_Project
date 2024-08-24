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
      <div className="mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col lg:flex-row gap-8 items-start lg:items-center">
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <Slider {...settings}>
            {prodDet?.images.map((src, index) => (
              <img src={src} alt="Product" key={index} className="w-full" />
            ))}
          </Slider>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {prodDet?.title}
          </h2>
          <p className="text-gray-600 mb-4">{prodDet?.description}</p>
          <span className="block text-lg font-semibold text-blue-600 mb-4">
            {prodDet?.category?.name}
          </span>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <p className="text-lg md:text-xl font-bold text-green-600 mb-2 md:mb-0">
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
            {load && loadid === prodDet.id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
      <div className="container mx-auto p-6 flex flex-wrap gap-4 justify-center">
        {relatedProdDet?.map((el) => (
          <div key={el.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-2">
            <Link to={`/productDetials/${el.id}/${el.category.name}`} className="block">
              <img src={el.imageCover} className="w-full h-48 object-cover rounded-lg" alt={el.name} />
              <h2 className="text-lg font-bold text-center p-3">
                {el.category.name}
              </h2>
              <p className="text-center">
                {el.title.split(" ").slice(0, 2).join(" ")}
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
              {load && loadid === el._id ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  );
  
}

// تكنلوجي وتنمية الزقازيق

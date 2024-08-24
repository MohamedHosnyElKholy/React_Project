import React from "react";
import style from "../MainSlider/MainSlider.module.css";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner.png";
import slide5 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="container">
      <div className="w-[75%]">
        <Slider {...settings}>
          <img src={slide2} className="w-full h-[400px]" alt="" />
          <img src={slide4} className="w-full h-[400px]" alt="" />
          <img src={slide5} className="w-full h-[400px]" alt="" />
        </Slider>
      </div>
      <div className="w-[25%]">
        <img src={slide2} className="w-full h-[200px]" alt="" />
        <img src={slide3} className="w-full h-[200px]" alt="" />
      </div>
    </div>
  );
}

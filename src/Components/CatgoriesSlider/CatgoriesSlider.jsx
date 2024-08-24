import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";

export default function CatgoriesSlider() {
function getCatgiores(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
  let {data, isError, isFetched, isLoading, error} = useQuery({
    queryKey: ['CatgoryesProduct'],
    queryFn: getCatgiores
  })  

  if (isLoading) {
    return  <svg
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
  </svg>;
  }
  if (isError) {
    return <h3>{error}</h3>
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
      <Slider {...settings}>
        {data.data.data.map((el) => (
          <div key={el._id} className="my-5">
            <img
              src={el.image}
              className="w-full h-[200px] object-cover"
              alt={el.name}
            />
            <h2 className="my-5 text-center font-bold">{el.name}</h2>
          </div>
        ))}
      </Slider>
  );
}

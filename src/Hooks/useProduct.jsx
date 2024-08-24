import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function useProduct() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let productInfo = useQuery({
    queryKey: ["ReacentProduct"],
    queryFn: getProducts,
  });
  return productInfo;
}

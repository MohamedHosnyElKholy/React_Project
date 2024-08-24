import { createHashRouter, RouterProvider } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Registear from "./Components/Registear/Registear";
import Login from "./Components/Login/Login";
import Catgories from "./Components/Catgories/Catgories";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import NotFound from "./Components/NotFound/NotFound";
import UserContexetProvider from "./Contexet/UserContexet";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import ProductDetials from "./Components/ProductDetials/ProductDetials";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextPorvider from "./Contexet/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import WishList from "./Components/WishList/WishList";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Verity from "./Components/Verity/Verity";
import RestPassword from "./Components/RestPassword/RestPassword";

let query = new QueryClient();
let route = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRouter>
            <Brands />
          </ProtectedRouter>
        ),
      },
      {
        path: "productDetials/:id/:category",
        element: (
          <ProtectedRouter>
            <ProductDetials />
          </ProtectedRouter>
        ),
      },
      { path: "register", element: <Registear /> },
      { path: "login", element: <Login /> },
      {
        path: "catgories",
        element: (
          <ProtectedRouter>
            <Catgories />
          </ProtectedRouter>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRouter>
            <Products />
          </ProtectedRouter>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRouter>
            <Checkout />
          </ProtectedRouter>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRouter>
            <Allorders />
          </ProtectedRouter>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRouter>
            <WishList />
          </ProtectedRouter>
        ),
      },
      {
        path: "forget",
        element: <ForgetPassword />,
      },
      {
        path: "verity",
        element: <Verity />,
      },
      {
        path: "rest",
        element: <RestPassword />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContexetProvider>
        <QueryClientProvider client={query}>
          <CartContextPorvider>
            <RouterProvider router={route}></RouterProvider>
            <Toaster />
          </CartContextPorvider>
        </QueryClientProvider>
      </UserContexetProvider>
    </>
  );
}

export default App;

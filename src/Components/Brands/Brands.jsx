import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Contexet/CartContext";
import { useSpring, animated } from '@react-spring/web';

export default function Brands() {
  let { getAllBrands, getSpecificBrand } = useContext(CartContext);
  const [getAllDataBrands, setgetAllDataBrands] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  async function grtItemBrands() {
    let { data } = await getAllBrands();
    setgetAllDataBrands(data.data);
  }

  async function grtIdSpecificBrands(id) {
    let { data } = await getSpecificBrand(id);
    setPopupContent(data.data);
    setIsPopupOpen(true);
  }

  const closePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => setPopupContent(null), 300); // التأكد من انتهاء الرسوم المتحركة
  };

  useEffect(() => {
    grtItemBrands();
  }, []);

  const popupAnimation = useSpring({
    opacity: isPopupOpen ? 1 : 0,
    transform: isPopupOpen ? 'translateY(0)' : 'translateY(-100%)',
    config: { tension: 220, friction: 120 },
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 mt-6">All Brands</h2>
      <div className="container mx-auto p-4 flex flex-wrap gap-6 justify-center cursor-pointer">
        {getAllDataBrands?.map((el) => (
          <div
            onClick={() => grtIdSpecificBrands(el._id)}
            key={el._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 border border-gray-200 rounded-lg shadow-md bg-white flex flex-col"
          >
            <img
              src={el.image}
              className="w-full h-32 object-cover rounded-t-lg mb-4"
              alt={el.name}
            />
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {el.name}
            </h3>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
          onClick={closePopup}
        >
          <animated.div
            style={popupAnimation}
            className="relative p-6 bg-white border border-gray-300 shadow-lg rounded-lg max-w-md mx-auto w-full"
            onClick={(e) => e.stopPropagation()} // Prevents click events inside the modal from closing it
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              Close
            </button>
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-bold mb-4">{popupContent?.name}</h1>
              <p className="text-gray-700 mb-4">{popupContent?.slug}</p>
              <img
                src={popupContent?.image}
                alt={popupContent?.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </animated.div>
        </div>
      )}
    </>
  );
}

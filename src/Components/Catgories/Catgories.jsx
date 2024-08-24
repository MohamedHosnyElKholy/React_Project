import { CartContext } from "../../Contexet/CartContext";
import { useEffect, useState } from "react";
import { useContext } from "react";

export default function Catgories() {
  let { getAllCatgorys, getSpecificCategory } = useContext(CartContext);
  const [getdata, setgetdata] = useState(null);
  const [subCatgory, setsubCatgory] = useState(null);
  async function getCatgory() {
    let { data } = await getAllCatgorys();
    setgetdata(data.data);
  }
  async function getSpitictCatgory(id) {
    let { data } = await getSpecificCategory(id);
    setsubCatgory(data.data);
  }
  useEffect(() => {
    getCatgory();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 flex flex-wrap gap-4 justify-center">
        {/* Main Categories */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {getdata?.map((el) => (
            <div
              onClick={() => getSpitictCatgory(el._id)}
              key={el._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-between cursor-pointer"
            >
              <img
                src={el.image}
                className="w-full h-40 object-cover rounded-t-lg"
                alt={el.name}
              />
              <div className="p-3">
                <h2 className="text-lg md:text-xl font-bold text-green-500 text-center">
                  {el.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
  
        {/* Sub Categories */}
        <div className="flex flex-wrap gap-4 justify-center w-full">
          {subCatgory?.map((el) => (
            <div key={el._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg h-full flex items-center justify-center p-4">
                <h2 className="text-md md:text-lg font-semibold text-gray-800 text-center">
                  {el.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { LiaStarSolid } from "react-icons/lia";
import { VscTriangleDown } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../rtk//reducers/CartReducers";
import Loading from "../../components/Loading/Loading";

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [imgNum, setImgNum] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://amzone-colne.onrender.com/products?id=${params.id}`)
      .then((d) => {
        setData(d.data);
      })
      .catch((e) => console.log(e));
  }, [params.id]);

  const handleColorButtonClick = (colorValue, imgIndex) => {
    setSelectedColor(colorValue);
    setImgNum(imgIndex);
  };

  const handleAddToCart = (product) => {
    if (!selectedColor && product.images.length > 0) {
      // If no color is selected, set the default image as the first image
      product.selectedColor = product.images[0].color;
      product.selectedImage = product.images[0].url;
    } else {
      product.selectedColor = selectedColor;
      product.selectedImage = product.images[imgNum].url;
    }
    dispatch(addToCart(product));
  };

  if (!data.length) {
    return <Loading />;
  }

  const renderAboutProperties = (aboutObject, limit) => {
    const propertiesToRender = showAllProperties
      ? Object.entries(aboutObject)
      : Object.entries(aboutObject).slice(0, limit);

    return propertiesToRender.map(([key, value], index) => {
      if (typeof value === "object") {
        if (key === "Colors") {
          return (
            <div className="flex items-center" key={index}>
              <span className="font-bold my-1 w-20">{key}</span>
              {Object.entries(value).map(([, colorValue], colorIndex) => (
                <button
                  className={`color-button ${
                    selectedColor === colorValue
                      ? "selected bg-[#fa8900] text-white"
                      : "bg-white text-gray-700"
                  } px-4 py-2 rounded-md mx-1 mb-2`}
                  key={colorIndex}
                  onClick={() => setSelectedColor(colorValue)}
                >
                  {colorValue}
                </button>
              ))}
            </div>
          );
        } else {
          return (
            <div className="flex flex-col" key={index}>
              <span className="font-bold my-1">{key}</span>
              {renderAboutProperties(value)}
            </div>
          );
        }
      } else {
        return (
          <div className="flex items-center" key={index}>
            <span className="w-20 block my-1 font-bold">{key}</span>
            <span className="ms-8">{value}</span>
          </div>
        );
      }
    });
  };

  const product = data.map((pr) => {
    pr.quantity = 1;
    return (
      <div
        key={pr.id}
        className="w-full h-full flex flex-col lg:flex-row justify-center"
      >
        <div
          className={`w-[70%] sm:w-[60%] hidden sm:flex mb-4 relative mx-auto lg:w-[27%] h-96 justify-center lg:fixed lg:left-[8%]`}
        >
          <div className="flex flex-col justify-center items-center">
            {pr.images.map((img, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleColorButtonClick(img.color, index)}
                  className={`color-button ${
                    selectedColor === img.color
                      ? "selected"
                      : "bg-white text-gray-700"
                  } h-20 w-20 mx-4 my-3`}
                >
                  <img
                    src={img.url}
                    className="h-full w-full rounded-md "
                    alt="image"
                  />
                </button>
              );
            })}
          </div>
          <img src={pr.images[imgNum].url} className="h-full w-full " />
        </div>
        <div
          className={`w-[70%] sm:w-[60%] sm:hidden mb-24 relative mx-auto lg:w-[27%] h-96 flex justify-center lg:fixed lg:left-[8%]`}
        >
          <div className="flex flex-col justify-center items-center sm:hidden">
            <img src={pr.images[imgNum].url} className="h-full w-full" />
            <div className="flex justify-center flex-wrap">
              {pr.images.map((img, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setImgNum(index)}
                    className="h-20 w-20 mx-4 my-3"
                  >
                    <img
                      src={img.url}
                      className="h-full w-full  "
                      alt="image"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-[90%]  px-2 lg:w-[30%] lg:mx-2 relative lg:left-[20%]">
          <h4 className="text-2xl">{pr.name}</h4>
          <div className="flex my-2 pb-4">
            <span>4.4</span>
            <div className="flex items-center text-amber-500 text-xl mx-2">
              <LiaStarSolid />
              <LiaStarSolid />
              <LiaStarSolid />
              <LiaStarSolid />
              <LiaStarSolid />
            </div>
            <span className="text-[#007185]">300 ratings</span>
          </div>
          <div className=" pb-4">
            <h4 className="text-xl font-bold ">${pr.price}</h4>
            <h4 className="text-[#565959] text-sm ">
              $366.41 Shipping & Import Fees Deposit to Egypt
            </h4>
            <div className="flex flex-col mt-2">
              {renderAboutProperties(
                pr.about,
                showAllProperties ? undefined : 5
              )}
            </div>
            {Object.entries(pr.about).length > 5 && (
              <div
                className="flex items-center text-[#007185] cursor-pointer"
                onClick={() => setShowAllProperties(!showAllProperties)}
              >
                <span className="me-1">
                  {showAllProperties ? "See less" : "See more"}
                </span>
                <VscTriangleDown />
              </div>
            )}
          </div>
          <div>
            <h4 className="my-3 font-bold">About this item</h4>
            <ul className="list-disc">
              {pr.aboutthisitem.map((point, index) => {
                return (
                  <li key={index} className="text-sm mb-3">
                    {point.point}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-[90%] mx-auto  px-2 lg:w-[22%] lg:mx-2 relative flex flex-col lg:left-[20%] h-fit border-gray-300 border-solid border-[1px] rounded p-3">
          <span className="text-xl font-bold mb-2">${pr.price}</span>
          <h5>
            $273.76 Shipping & Import Fees Deposit to Egypt Details Delivery
            <span className="font-semibold ms-1">Sunday, August 13</span>
          </h5>
          <span className="my-2 text-xl text-[#238823]">In Stock</span>
          <div className="flex flex-col">
            <button
              className="rounded-full py-2 bg-[#ffd814] text-white my-3"
              onClick={() => handleAddToCart({ ...pr, selectedColor })}
            >
              Add to Cart
            </button>

            <button className="rounded-full py-2 bg-[#fa8900]">Buy Now</button>
          </div>
          <div className="text-sm mt-6">
            <div className="flex mb-2">
              <span className="w-24 block">Payment</span>
              <span className="block text-[#007185]">Secure Transaction</span>
            </div>
            <div className="flex mb-2">
              <span className="w-24 block">Ships from</span>
              <span className="w-10 block text-[#007185]">Amazon</span>
            </div>
            <div className="flex mb-2">
              <span className="w-24 block">Sold by</span>
              <span className="w-10 block text-[#007185]"></span>
            </div>
            <div className="flex mb-2">
              <span className="w-24 me-10 block">Returns</span>
              <span className="block text-[#007185]">
                Eligible for Return, Refund or Replacement within 30 days of
                receipt
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <Navbar />
      <section className="relative top-56 md:top-[150px] bg-white">
        {product}
      </section>
    </>
  );
};

export default ProductDetails;
